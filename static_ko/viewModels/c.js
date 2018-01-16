
ko.bindingHandlers.fadeVisible = {
  init: (element, valueAccessor) => {
    // Start visible/invisible according to initial value
    const shouldDisplay = valueAccessor();
    $(element).toggle(shouldDisplay);
  },
  update: (element, valueAccessor) => {
    // On update, fade in/out
    const shouldDisplay = valueAccessor();
    return shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
  }
};

ko.bindingHandlers.jqButton = {
  init: element => {
    $(element).button(); // Turns the element into a jQuery UI button
  },
  update: function(element, valueAccessor) {
    let currentValue = valueAccessor();
    // Here we just update the "disabled" state, but you could update other properties too
    $(element).button("option", "disabled", currentValue.enable === false);
  }
};

ko.bindingHandlers.starRating = {
  init: (element, valueAccessor) => {
    $(element).addClass("starRating");
    for (var i = 0; i < 5; i++)
      $("<span>").appendTo(element);

    // Handle mouse events on the stars
    $("span", element).each(index => {
      $(this).hover(
        function() { $(this).prevAll().add(this).addClass("hoverChosen"); },
        function() { $(this).prevAll().add(this).removeClass("hoverChosen"); }
      ).click(() => {
        let observable = valueAccessor();  // Get the associated observable
        observable(index+1);               // Write the new rating to it
      });
    });
  },

  update: function(element, valueAccessor) {
    // Give the first x stars the "chosen" class, where x <= rating
    const observable = valueAccessor();
    $("span", element).each(function(index) {
      $(this).toggleClass("chosen", index < observable());
    });
  }
};

// ----------------------------------------------------------------------------
// Page viewmodel

class Answer {
  constructor(text) {
    this.answerText = text;
    this.points = ko.observable(1);
  }
}

class SurveyViewModel {
  constructor(question, pointsBudget, answers) {
    this.question = question;
    this.pointsBudget = pointsBudget;
    this.answers = $.map(answers, text => new Answer(text));
    // this.save = () => alert('Things To Do');

    this.pointsUsed = ko.computed(() => {
      return this.answers.map(x => x.points())
      .reduce((acc, currVal) => acc + currVal);
    });
  }
}

$(document).ready(function() {
  const surveyViewModel = new SurveyViewModel('What Affects Your Choices?', 20, [
    'Functionality',
    'Frequency',
    'Numbers',
    'Totallity'
  ]);
  ko.applyBindings(surveyViewModel, document.getElementById('cc'));
});