class ClickCounterViewModel {
  constructor() {
    this.numberOfClicks = ko.observable(0);
    this.registerClick = () => {
      this.numberOfClicks(this.numberOfClicks() + 1);
    };

    this.resetClicks = () => {
      this.numberOfClicks(0);
    };

    this.hasClickedTooManyTimes = ko.pureComputed(function() {
      return this.numberOfClicks() >= 30;
    }, this);
  }
}

$(document).ready(function() {
  const clickCounterViewModel = new ClickCounterViewModel();
  ko.applyBindings(clickCounterViewModel, document.getElementById('ee'));
});