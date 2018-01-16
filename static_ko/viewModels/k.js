var GiftModel = function(gifts) {
  var self = this;
  self.gifts = ko.observableArray(gifts);

  self.addGift = function() {
      self.gifts.push({
          name: "",
          price: ""
      });
  };

  self.removeGift = function(gift) {
      self.gifts.remove(gift);
  };

  self.save = function(form) {
    alert("Could now transmit to server: " + ko.utils.stringifyJson(self.gifts));
  };
};

const viewModel = new GiftModel([
  { name: "Tall Hat", price: "39.95"},
  { name: "Long Cloak", price: "120.00"}
]);
// Activate jQuery Validation
$("form").validate({ submitHandler: viewModel.save });
$(document).ready(function() {
  ko.applyBindings(viewModel, document.getElementById('kk'));
});