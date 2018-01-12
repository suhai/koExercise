/**
 * Intro To Knockout.js
 */
// import _ from 'underscore';
// import SeatReservation from './SeatReservation';
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

  addSeat() {
    this.seats.push(new SeatReservation('', this.availableMeals[0]));
    console.log(this.seats);
  }

  removeSeat(seat) {
    return this.seats.remove(seat);
  }
}
