// import TaskViewModel from 'TaskViewModel';
class TaskViewModel {
  constructor() {
    this.types = ko.observableArray([
        'JAMON',
        'HTML',
        'CSS',
        'AMD',
        'ES6',
        'jQuery',
        'REACT',
        'REDUX'
      ]);
    this.tasks = ko.observableArray();
    this.taskInputName = ko.observable();
    this.taskInputType = ko.observable();
    this.taskInputDeadline = ko.observable();
    this.selectedTasks = ko.observableArray();
    this.updatable = ko.observable(false);
    this.updateId = ko.observable();
  }

	editable() {
    return ko.computed(() => {
      return this.selectedTasks().length > 0;
    });
  }

	addTask() {
		const name = $('#name').val();
		const type = $('#type').val();
		const deadline = $('#deadline').val();

		this.tasks.push({
			name,
			type,
			deadline
		});

		$.ajax({
			url: 'http://localhost:8080/tasks',
			data: JSON.stringify({
				"name": name,
				"type": type,
				"deadline": deadline
			}),
			type: "POST",
			contentType: 'application/json',
			success: function(data){
				console.log('Task Added...');
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
	}

	updateTask() {
		const id = this.updateId;
		const name = $('#name').val();
		const type = $('#type').val();
		const deadline = $('#deadline').val();

		this.tasks.remove(item => (item._id == id));

		this.tasks.push({
			name,
			type,
			deadline
		});

		$.ajax({
			url: `http://localhost:8080/tasks/${id}`,
			data: JSON.stringify({
				"name": name,
				"type": type,
				"deadline": deadline
			}),
			type: "PUT",
			contentType: 'application/json',
			success: function(data){
				console.log('Task Updated...');
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
	}

	editSelected() {
    this.updateId = this.selectedTasks()[0]._id;
    const currTask = this.selectedTasks()[0];
    const { name, type, deadline } = currTask;

		this.updatable(true);
		this.taskInputName(name);
		this.taskInputType(type);
		this.taskInputDeadline(deadline);
	}

	deleteSelected() {
		$.each(this.selectedTasks(), (index, value) => {
			var id = this.selectedTasks()[index]._id;
			$.ajax({
				url: `http://localhost:8080/tasks/${id}`,
				type: 'DELETE',
				async: true,
				success: function(data){
					console.log('Task Removed...');
				},
				error: function(xhr, status, err){
					console.log(err);
				}
			});
		});
		this.tasks.removeAll(this.selectedTasks());
		this.selectedTasks.removeAll();
	}
}

const taskViewModel = new TaskViewModel();
ko.applyBindings(taskViewModel);

function getTasks(){
	$.get('http://localhost:8080/tasks', function(data){
		taskViewModel.tasks(data);
	});
}