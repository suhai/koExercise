ko.components.register('like-widget', {
  viewModel: function(params) {
    this.chosenValue = params.value;
    this.like = function() { this.chosenValue('like'); }.bind(this);
    this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
  },
  template:
    `<div class="like-or-dislike" data-bind="visible: !chosenValue()">
        <button data-bind="click: like">Like it</button>
        <button data-bind="click: dislike">Dislike it</button>
    </div>
    <div class="result" data-bind="visible: chosenValue">
        You <strong data-bind="text: chosenValue"></strong> it
    </div>`
});

class Product {
  constructor(name, rating) {
    this.name = name;
    this.userRating = ko.observable(rating || null);
  }
}

class MyViewModel {
  constructor() {
    this.products = ko.observableArray([
      new Product('Garlic bread'),
      new Product('Pain au chocolat'),
      new Product('Seagull spaghetti', 'like')
    ]);
  }

  addProduct() {
    var name = 'Product ' + (this.products().length + 1);
    this.products.push(new Product(name));
  }
}

$(document).ready(function() {
  const xViewModel = new MyViewModel();
  ko.applyBindings(xViewModel, document.getElementById('mm'));
});