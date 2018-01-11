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
    this.updatableTask = ko.observable(false);
    this.updateTaskId = ko.observable();
    this.taskCategories = ko.observableArray([
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

	editableTask() {
    return ko.computed(() => (this.selectedTasks().length > 0));
  }

	addTask() {
		const taskName = $('#taskName').val();
		const taskCategory = $('#taskCategory').val();
		const deadline = $('#deadline').val();

		this.tasks.push({
			taskName,
			taskCategory,
			deadline
		});

		$.ajax({
			url: 'http://localhost:8080/tasks',
			data: JSON.stringify({
				"taskName": taskName,
				"taskCategory": taskCategory,
				"deadline": deadline
			}),
			type: "POST",
			contentType: 'application/json',
			success: data => console.log('Task Added...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	updateTask() {
		const id = this.updateTaskId;
		const taskName = $('#taskName').val();
		const taskCategory = $('#taskCategory').val();
		const deadline = $('#deadline').val();

		this.tasks.remove(item => (item._id == id));
		this.tasks.push({
			taskName,
			taskCategory,
			deadline
		});

		$.ajax({
			url: `http://localhost:8080/tasks/${id}`,
			data: JSON.stringify({
				"taskName": taskName,
				"taskCategory": taskCategory,
				"deadline": deadline
			}),
			type: "PUT",
			contentType: 'application/json',
			success: data => console.log('Task Updated...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	editSelectedTask() {
    this.updateTaskId = this.selectedTasks()[0]._id;
    const currTask = this.selectedTasks()[0];
    const { taskName, taskCategory, deadline } = currTask;

		this.updatableTask(true);
		this.taskInputName(taskName);
		this.taskInputCategory(taskCategory);
		this.taskInputDeadline(deadline);
	}

	deleteSelectedTask() {
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