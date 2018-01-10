import TaskViewModel from './TaskViewModel';

const taskViewModel = new TaskViewModel();
ko.applyBindings(taskViewModel);

function getTasks(){
	$.get('http://localhost:8080/tasks', function(data){
		taskViewModel.tasks(data);
	});
}