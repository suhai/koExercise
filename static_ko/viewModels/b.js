class SeatReservation {
  constructor(name, initialMeal) {
    this.name = name;
    this.meal = ko.observable(initialMeal);

    this.formattedPrice = ko.computed(() => {
      const price = this.meal().price;
      return price ? `$${price.toFixed(2)}` : 'Free';
    });
  }
}

class ReservationViewModel {
  constructor() {
    const self = this;
    this.availableMeals = [
      { mealName: 'Cookies', price: 0.00 },
      { mealName: 'Standard', price: 10.00 },
      { mealName: 'Premium', price: 34.95 },
      { mealName: 'Ultimate', price: 290.50 }
    ];
    /** Editable data */
    this.seats = ko.observableArray([
      new SeatReservation('Tom', this.availableMeals[0]),
      new SeatReservation('Anna', this.availableMeals[1]),
      new SeatReservation('John', this.availableMeals[2]),
    ]);

    /** Computed data */
    this.totalCost = ko.computed(() => {
      return this.seats().map(seat => seat.meal().price)
      .reduce((acc, currVal) => acc + currVal);
    });

    this.removeSeat = (seat) => {
      return this.seats.remove(seat);
    };
  }

  addSeat() {
    this.seats.push(new SeatReservation('Enter Name', this.availableMeals[0]));
  }
}

$(document).ready(function() {
  const reservationViewModel = new ReservationViewModel();
  ko.applyBindings(reservationViewModel, document.getElementById('bb'));
});