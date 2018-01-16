class BetterListViewModel {
  constructor() {
    this.itemToAdd = ko.observable('');
    this.allItems = ko.observableArray(['Oranges', 'Mangos', 'Apples']);
    this.selectedItems = ko.observableArray([]);
  }

  addItem() {
    let addable = this.itemToAdd();
    if (addable != '' && this.allItems.indexOf(addable) < 0) {
      this.allItems.push(addable);
      this.itemToAdd('');
    }
  }

  removeSelected() {
    this.allItems.removeAll(this.selectedItems());
    this.selectedItems([]);
  }

  sortItems() {
    this.allItems.sort();
  }
}

$(document).ready(function() {
  const betterListModelViewModel = new BetterListViewModel();
  ko.applyBindings(betterListModelViewModel, document.getElementById('ff'));
});