// import TaskViewModel from 'TaskViewModel';
/**
 * This is a class that a user the ability to create, edit/update, view, and/or delete tasks.
 */
class TaskViewModel {
  constructor() {
    this.tasks = ko.observableArray();
    this.taskInputName = ko.observable();
    this.taskInputCategory = ko.observable();
    this.taskInputDeadline = ko.observable();
    this.selectedTasks = ko.observableArray();
    this.updatable = ko.observable(false);
    this.updateId = ko.observable();
    this.categories = ko.observableArray([
      'JAMON',
      'HTML',
      'CSS',
      'AMD',
      'ES6',
      'jQuery',
      'REACT',
      'REDUX'
    ]);
  }

	editable() {
    return ko.computed(() => (this.selectedTasks().length > 0));
  }

	addTask() {
		const name = $('#name').val();
		const category = $('#category').val();
		const deadline = $('#deadline').val();

		this.tasks.push({
			name,
			category,
			deadline
		});

		$.ajax({
			url: 'http://localhost:8080/tasks',
			data: JSON.stringify({
				"name": name,
				"category": category,
				"deadline": deadline
			}),
			type: "POST",
			contentType: 'application/json',
			success: data => console.log('Task Added...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	updateTask() {
		const id = this.updateId;
		const name = $('#name').val();
		const category = $('#category').val();
		const deadline = $('#deadline').val();

		this.tasks.remove(item => (item._id == id));
		this.tasks.push({
			name,
			category,
			deadline
		});

		$.ajax({
			url: `http://localhost:8080/tasks/${id}`,
			data: JSON.stringify({
				"name": name,
				"category": category,
				"deadline": deadline
			}),
			type: "PUT",
			contentType: 'application/json',
			success: data => console.log('Task Updated...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	editSelected() {
    this.updateId = this.selectedTasks()[0]._id;
    const currTask = this.selectedTasks()[0];
    const { name, category, deadline } = currTask;

		this.updatable(true);
		this.taskInputName(name);
		this.taskInputCategory(category);
		this.taskInputDeadline(deadline);
	}

	deleteSelected() {
		$.each(this.selectedTasks(), (index, value) => {
			const id = this.selectedTasks()[index]._id;
			$.ajax({
				url: `http://localhost:8080/tasks/${id}`,
				type: 'DELETE',
				async: true,
				success: data => console.log('Task Removed...'),
				error: (xhr, status, err) => console.log(err)
			});
    });

		this.tasks.removeAll(this.selectedTasks());
		this.selectedTasks.removeAll();
	}
}

const taskViewModel = new TaskViewModel();
ko.applyBindings(taskViewModel);

/** Fire up the ViewModel to the app's homepage. */
function getTasks(){
	$.get('http://localhost:8080/tasks', function(data){
		taskViewModel.tasks(data);
	});
}