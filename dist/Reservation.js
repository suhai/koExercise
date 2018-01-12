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

// Overall viewmodel for this screen, along with initial state
// class ReservationViewModel {
//   constructor() {
//     this.availableMeals = [
//       { mealName: 'Cookies', price: 0.00 },
//       { mealName: 'Standard', price: 10.00 },
//       { mealName: 'Premium', price: 34.95 },
//       { mealName: 'Ultimate', price: 290.50 }
//     ];
//     /** Editable data */
//     this.seats = ko.observableArray([
//       new SeatReservation('Tom', this.availableMeals[0]),
//       new SeatReservation('Anna', this.availableMeals[1]),
//       new SeatReservation('John', this.availableMeals[2]),
//     ]);

//     /** Computed data */
//     this.totalSurcharge = ko.computed(() => {
//       return this.seats().map(seat => seat.meal().price)
//       .reduce((acc, currVal) => acc + currVal);
//     });
//   }

//   addSeat() {
//     this.seats.push(new SeatReservation('Enter Name', this.availableMeals[0]));
//   }

//   removeSeat(seat) { return this.seats.remove(seat); }
// }

function ReservationViewModel() {
  var self = this;
  self.availableMeals = [
    { mealName: 'Cookies', price: 0.00 },
    { mealName: 'Standard', price: 10.00 },
    { mealName: 'Premium', price: 34.95 },
    { mealName: 'Ultimate', price: 290.50 }
  ];

  self.seats = ko.observableArray([
    new SeatReservation('Tom', this.availableMeals[0]),
    new SeatReservation('Anna', this.availableMeals[1]),
    new SeatReservation('John', this.availableMeals[2]),
  ]);

  self.totalSurcharge = ko.computed(() => {
    return this.seats().map(seat => seat.meal().price)
    .reduce((acc, currVal) => acc + currVal);
  });

  self.addSeat = function() {
    self.seats.push(new SeatReservation("", self.availableMeals[0]));
  };

  self.removeSeat = function(seat) { self.seats.remove(seat); };
}
