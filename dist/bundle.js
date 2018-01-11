/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Task = __webpack_require__(1);

var _Task2 = _interopRequireDefault(_Task);

var _Hobby = __webpack_require__(2);

var _Hobby2 = _interopRequireDefault(_Hobby);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskViewModel = void 0;
var hobbyViewModel = void 0;

$(document).ready(function () {
  if ($.isEmptyObject(taskViewModel)) {
    var _taskViewModel = new _Task2.default();
    ko.applyBindings(_taskViewModel, document.getElementById("tasks"));
    $.get('http://localhost:8080/tasks', function (data) {
      _taskViewModel.tasks(data);
    });
  }

  if ($.isEmptyObject(hobbyViewModel)) {
    var _hobbyViewModel = new _Hobby2.default();
    ko.applyBindings(_hobbyViewModel, document.getElementById("hobbies"));
    $.get('http://localhost:8080/hobbies', function (data) {
      _hobbyViewModel.hobbies(data);
    });
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a class that a user the ability to create, edit/update, view, and/or delete tasks.
 */
var TaskViewModel = function () {
	function TaskViewModel() {
		_classCallCheck(this, TaskViewModel);

		this.tasks = ko.observableArray();
		this.taskInputName = ko.observable();
		this.taskInputCategory = ko.observable();
		this.taskInputDeadline = ko.observable();
		this.selectedTasks = ko.observableArray();
		this.updatableTask = ko.observable(false);
		this.updateTaskId = ko.observable();
		this.taskCategories = ko.observableArray(['JAMON', 'HTML', 'CSS', 'AMD', 'ES6', 'jQuery', 'REACT', 'REDUX']);
	}

	_createClass(TaskViewModel, [{
		key: 'editableTask',
		value: function editableTask() {
			var _this = this;

			return ko.computed(function () {
				return _this.selectedTasks().length > 0;
			});
		}
	}, {
		key: 'addTask',
		value: function addTask() {
			var taskName = $('#taskName').val();
			var taskCategory = $('#taskCategory').val();
			var deadline = $('#deadline').val();

			this.tasks.push({
				taskName: taskName,
				taskCategory: taskCategory,
				deadline: deadline
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
				success: function success(data) {
					return console.log('Task Added...');
				},
				error: function error(xhr, status, err) {
					return console.log(err);
				}
			});
		}
	}, {
		key: 'updateTask',
		value: function updateTask() {
			var id = this.updateTaskId;
			var taskName = $('#taskName').val();
			var taskCategory = $('#taskCategory').val();
			var deadline = $('#deadline').val();

			this.tasks.remove(function (item) {
				return item._id == id;
			});
			this.tasks.push({
				taskName: taskName,
				taskCategory: taskCategory,
				deadline: deadline
			});

			$.ajax({
				url: 'http://localhost:8080/tasks/' + id,
				data: JSON.stringify({
					"taskName": taskName,
					"taskCategory": taskCategory,
					"deadline": deadline
				}),
				type: "PUT",
				contentType: 'application/json',
				success: function success(data) {
					return console.log('Task Updated...');
				},
				error: function error(xhr, status, err) {
					return console.log(err);
				}
			});
		}
	}, {
		key: 'editSelectedTask',
		value: function editSelectedTask() {
			this.updateTaskId = this.selectedTasks()[0]._id;
			var currTask = this.selectedTasks()[0];
			var taskName = currTask.taskName,
			    taskCategory = currTask.taskCategory,
			    deadline = currTask.deadline;


			this.updatableTask(true);
			this.taskInputName(taskName);
			this.taskInputCategory(taskCategory);
			this.taskInputDeadline(deadline);
		}
	}, {
		key: 'deleteSelectedTask',
		value: function deleteSelectedTask() {
			var _this2 = this;

			$.each(this.selectedTasks(), function (index, value) {
				var id = _this2.selectedTasks()[index]._id;
				$.ajax({
					url: 'http://localhost:8080/tasks/' + id,
					type: 'DELETE',
					async: true,
					success: function success(data) {
						return console.log('Task Removed...');
					},
					error: function error(xhr, status, err) {
						return console.log(err);
					}
				});
			});

			this.tasks.removeAll(this.selectedTasks());
			this.selectedTasks.removeAll();
		}
	}]);

	return TaskViewModel;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a class that a user the ability to create, edit/update, view, and/or delete hobbies.
 */
var HobbyViewModel = function () {
	function HobbyViewModel() {
		_classCallCheck(this, HobbyViewModel);

		this.hobbies = ko.observableArray();
		this.hobbyInputName = ko.observable();
		this.hobbyInputCategory = ko.observable();
		this.hobbyInputFrequency = ko.observable();
		this.selectedHobbies = ko.observableArray();
		this.updatableHobby = ko.observable(false);
		this.updateHobbyId = ko.observable();
		this.hobbyCategories = ko.observableArray(['Outdoors', 'Indoors', 'Water Sports', 'E-Games', 'Board Games', 'Card Games']);
	}

	_createClass(HobbyViewModel, [{
		key: 'editableHobby',
		value: function editableHobby() {
			var _this = this;

			return ko.computed(function () {
				return _this.selectedHobbies().length > 0;
			});
		}
	}, {
		key: 'addHobby',
		value: function addHobby() {
			var hobbyName = $('#hobbyName').val();
			var hobbyCategory = $('#hobbyCategory').val();
			var frequency = $('#frequency').val();

			this.hobbies.push({
				hobbyName: hobbyName,
				hobbyCategory: hobbyCategory,
				frequency: frequency
			});

			$.ajax({
				url: 'http://localhost:8080/hobbies',
				data: JSON.stringify({
					"hobbyName": hobbyName,
					"hobbyCategory": hobbyCategory,
					"frequency": frequency
				}),
				type: "POST",
				contentType: 'application/json',
				success: function success(data) {
					return console.log('Hobby Added...');
				},
				error: function error(xhr, status, err) {
					return console.log(err);
				}
			});
		}
	}, {
		key: 'updateHobby',
		value: function updateHobby() {
			var id = this.updateHobbyId;
			var hobbyName = $('#hobbyName').val();
			var hobbyCategory = $('#hobbyCategory').val();
			var frequency = $('#frequency').val();

			this.hobbies.remove(function (item) {
				return item._id == id;
			});
			this.hobbies.push({
				hobbyName: hobbyName,
				hobbyCategory: hobbyCategory,
				frequency: frequency
			});

			$.ajax({
				url: 'http://localhost:8080/hobbies/' + id,
				data: JSON.stringify({
					"hobbyName": hobbyName,
					"hobbyCategory": hobbyCategory,
					"frequency": frequency
				}),
				type: "PUT",
				contentType: 'application/json',
				success: function success(data) {
					return console.log('Hobby Updated...');
				},
				error: function error(xhr, status, err) {
					return console.log(err);
				}
			});
		}
	}, {
		key: 'editSelectedHobby',
		value: function editSelectedHobby() {
			this.updateHobbyId = this.selectedHobbies()[0]._id;
			var currHobby = this.selectedHobbies()[0];
			var hobbyName = currHobby.hobbyName,
			    hobbyCategory = currHobby.hobbyCategory,
			    frequency = currHobby.frequency;


			this.updatableHobby(true);
			this.hobbyInputName(hobbyName);
			this.hobbyInputCategory(hobbyCategory);
			this.hobbyInputFrequency(frequency);
		}
	}, {
		key: 'deleteSelectedHobby',
		value: function deleteSelectedHobby() {
			var _this2 = this;

			$.each(this.selectedHobbies(), function (index, value) {
				var id = _this2.selectedHobbies()[index]._id;
				$.ajax({
					url: 'http://localhost:8080/hobbies/' + id,
					type: 'DELETE',
					async: true,
					success: function success(data) {
						return console.log('Hobby Removed...');
					},
					error: function error(xhr, status, err) {
						return console.log(err);
					}
				});
			});

			this.hobbys.removeAll(this.selectedHobbies());
			this.selectedHobbies.removeAll();
		}
	}]);

	return HobbyViewModel;
}();

/***/ })
/******/ ]);