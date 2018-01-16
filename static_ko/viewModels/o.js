class AppViewModel {
  constructor(type) {
    this.type = type;
    this.data = ko.observableArray([
      { name: 'Alfred', position: 'Butler', location: 'London' },
      { name: 'Bruce', position: 'Chairman', location: 'New York' }
    ]);
  }

  flipData() {
    this.starttime = new Date().getTime();
    let data = this.data();
    for (var i = 0; i < 999; i++) {
      this.data([]);
      this.data(data.reverse());
    }
  }

  timing() {
    return this.starttime ? new Date().getTime() - this.starttime : 0;
  }
}

$(document).ready(function() {
  ko.options.deferUpdates = true;
  const vmDeferred = new AppViewModel('deferred');

  ko.options.deferUpdates = false;
  const vmStandard = new AppViewModel('standard');

  ko.applyBindings([vmStandard, vmDeferred], document.getElementById('oo'));
});