class IntroViewModel {
  constructor(fName, lName) {
    this.firstName = ko.observable(fName);
    this.lastName = ko.observable(lName);
    this.fullName = ko.computed(() => (`${this.firstName()} ${this.lastName()}`));
  }

  capitalizeLastName() {
    const currentVal = this.lastName();
    return this.lastName(currentVal.toUpperCase());
  }
}

$(document).ready(function() {
  const introViewModel = new IntroViewModel('john', 'Bull');
  ko.applyBindings(introViewModel, document.getElementById('aa'));
});