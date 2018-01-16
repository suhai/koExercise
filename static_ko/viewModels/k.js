ko.extenders.required = function(target, overrideMessage) {
  target.hasError = ko.observable();
  target.validationMessage = ko.observable();

  function validate(newValue) {
    target.hasError(newValue ? false : true);
    target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
  }

  validate(target());
  target.subscribe(validate);
  return target;
};

class AppViewModel {
  constructor(first, last){
    this.firstName = ko.observable(first).extend({ required: 'Please enter a first name', logChange: 'first name' });
    this.lastName = ko.observable(last).extend({ required: '' });
  }
}

// ko.applyBindings(new AppViewModel("Bob","Smith"));
$(document).ready(function() {
  const xViewModel = new AppViewModel('John', 'Bull');
  ko.applyBindings(xViewModel, document.getElementById('kk'));
});