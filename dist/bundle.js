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


var _TaskViewModel = __webpack_require__(1);

var _TaskViewModel2 = _interopRequireDefault(_TaskViewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskViewModel = new _TaskViewModel2.default();
ko.applyBindings(taskViewModel);

function getTasks() {
	$.get('http://localhost:8080/tasks', function (data) {
		taskViewModel.tasks(data);
	});
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		this.updatable = ko.observable(false);
		this.updateId = ko.observable();
		this.categories = ko.observableArray(['JAMON', 'HTML', 'CSS', 'AMD', 'ES6', 'jQuery', 'REACT', 'REDUX']);
	}

	_createClass(TaskViewModel, [{
		key: 'editable',
		value: function editable() {
			var _this = this;

			return ko.computed(function () {
				return _this.selectedTasks().length > 0;
			});
		}
	}, {
		key: 'addTask',
		value: function addTask() {
			var name = $('#name').val();
			var category = $('#category').val();
			var deadline = $('#deadline').val();

			this.tasks.push({
				name: name,
				category: category,
				deadline: deadline
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
			var id = this.updateId;
			var name = $('#name').val();
			var category = $('#category').val();
			var deadline = $('#deadline').val();

			this.tasks.remove(function (item) {
				return item._id == id;
			});
			this.tasks.push({
				name: name,
				category: category,
				deadline: deadline
			});

			$.ajax({
				url: 'http://localhost:8080/tasks/' + id,
				data: JSON.stringify({
					"name": name,
					"category": category,
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
		key: 'editSelected',
		value: function editSelected() {
			this.updateId = this.selectedTasks()[0]._id;
			var currTask = this.selectedTasks()[0];
			var name = currTask.name,
			    category = currTask.category,
			    deadline = currTask.deadline;


			this.updatable(true);
			this.taskInputName(name);
			this.taskInputCategory(category);
			this.taskInputDeadline(deadline);
		}
	}, {
		key: 'deleteSelected',
		value: function deleteSelected() {
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

exports.default = TaskViewModel;

/***/ })
/******/ ]);