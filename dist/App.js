// import TaskViewModel from 'TaskViewModel';
/**
 * This brings all the ViewModels together.
 */
let taskViewModel;
let hobbyViewModel;
let introViewModel;

$(document).ready(function() {
  const introViewModel = new IntroViewModel('suhai', 'Yehuza');
  ko.applyBindings(introViewModel, document.getElementById("intro"));

  if ($.isEmptyObject(taskViewModel)) {
    const taskViewModel = new TaskViewModel();
    ko.applyBindings(taskViewModel, document.getElementById("tasks"));
    $.get('http://localhost:8080/tasks', function(data){
		  taskViewModel.tasks(data);
    });
  }

  if ($.isEmptyObject(hobbyViewModel)) {
    const hobbyViewModel = new HobbyViewModel();
    ko.applyBindings(hobbyViewModel, document.getElementById("hobbies"));
    $.get('http://localhost:8080/hobbies', function(data){
		  hobbyViewModel.hobbies(data);
	  });
  }
});