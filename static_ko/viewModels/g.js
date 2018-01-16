class XViewModel {
  constructor() {
    this.stringValue = ko.observable('Hello');
    this.passwordValue = ko.observable('mypass');
    this.booleanValue = ko.observable(true);
    this.optionValues = ['Alpha', 'Beta', 'Gamma'];
    this.selectedOptionValue = ko.observable('Gamma');
    this.multipleSelectedOptionValues = ko.observable(['Alpha']);
    this.radioSelectedOptionValue = ko.observable('Beta');
  }
}

$(document).ready(function() {
  const xViewModel = new XViewModel();
  ko.applyBindings(xViewModel, document.getElementById('gg'));
});
