ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
  return ko.pureComputed(function() {
      var allItems = this(), matchingItems = [];
      for (var i = 0; i < allItems.length; i++) {
        var current = allItems[i];
        if (ko.unwrap(current[propName]) === matchValue)
          matchingItems.push(current);
      }
      return matchingItems;
  }, this);
};

class Task {
  constructor(title, done) {
    this.title = ko.observable(title);
    this.done = ko.observable(done);
  }
}

class AppViewModel {
  constructor() {
    this.tasks = ko.observableArray([
      new Task('Find new desktop background', true),
      new Task('Put shiny stickers on laptop', false),
      new Task('Request more reggae music in the office', true)
    ]);
    this.doneTasks = this.tasks.filterByProperty("done", true);
  }
}

$(document).ready(function() {
  const xViewModel = new AppViewModel();
  ko.applyBindings(xViewModel, document.getElementById('qq'));
});