
class PlanetsModel {
  constructor() {
    this.planets = ko.observableArray([
      { name: 'Mercury', type: 'rock'},
      { name: 'Venus', type: 'rock'},
      { name: 'Earth', type: 'rock'},
      { name: 'Mars', type: 'rock'},
      { name: 'Jupiter', type: 'gasgiant'},
      { name: 'Saturn', type: 'gasgiant'},
      { name: 'Uranus', type: 'gasgiant'},
      { name: 'Neptune', type: 'gasgiant'}
    ]);

    this.typeToShow = ko.observable('all');
    this.displayAdvancedOptions = ko.observable(false);
    this.planetsToShow = ko.pureComputed(() => {
      const desiredType = this.typeToShow();
      if (desiredType == 'all') {
        return this.planets();
      }

      ko.utils.arrayFilter(this.planets(), planet => {
        return planet.type == desiredType;
      });
    });
  }


  addPlanet(type) {
    this.planets.push({
      name: 'New planet',
      type: type
    });
  }

  showPlanetElement(elem) {
    if (elem.nodeType === 1) {
      return $(elem).hide().slideDown();
    }
  }

  hidePlanetElement(elem) {
    if (elem.nodeType === 1) {
      return $(elem).slideUp(() => $(elem).remove());
    }
  }
}

ko.bindingHandlers.fadeVisible = {
  init(element, valueAccessor) {
    const value = valueAccessor();
    $(element).toggle(ko.unwrap(value));
  },

  update(element, valueAccessor) {
    const value = valueAccessor();
    ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
  }
};

$(document).ready(function() {
  const viewModel = new PlanetsModel();
  ko.applyBindings(viewModel, document.getElementById('ii'));
});