class Person {
  constructor(name, children) {
    this.name = ko.observable(name);
    this.children = ko.observableArray(children || []);
  }
}

class PeopleModel {
  constructor() {
    this.people = ko.observableArray([
      new Person("Bob", [
        new Person("Jan"),
        new Person("Don", [
          new Person("Ted"),
          new Person("Ben", [
            new Person("Joe", [
              new Person("Ali"),
              new Person("Ken")
            ])
          ]),
          new Person("Doug")
        ])
      ]),
      new Person("Ann", [
        new Person("Eve"),
        new Person("Hal")
      ])
    ]);

    this.addChild = (name, parentArray) => {
      parentArray.push(new Person(name));
    };
  }
}

$(document).ready(function() {
  const xViewModel = new PeopleModel();
  ko.applyBindings(xViewModel, document.getElementById('dd'));
  $("#people").on("click", ".remove", function() {
    const context = ko.contextFor(this),
      parentArray = context.$parent.people || context.$parent.children;
    parentArray.remove(context.$data);

    return false;
  });

  $("#people").on("click", ".add", function() {
    const context = ko.contextFor(this),
      childName = context.$data.name() + " child",
      parentArray = context.$data.people || context.$data.children;
    context.$root.addChild(childName, parentArray);

    return false;
  });
});
