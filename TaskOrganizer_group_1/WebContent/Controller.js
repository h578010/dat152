"use strict";

const container1 = document.getElementById("taskcontainer1");
const container2 = document.getElementById("taskcontainer2");
const gui1 = new GuiHandler(container1);
const gui2 = new GuiHandler(container2);

const api = new TaskAPI("../");

const tasksmodaleboxdiv1 = document.getElementById("taskbox1");
const tasksmodaleboxdiv2 = document.getElementById("taskbox2");

async function initialize() {
	let allStatuses = await api.getStatuses();
	gui1.allstatuses = allStatuses;
	gui2.allstatuses = allStatuses;

	let tasks = await api.getTasklist();

	tasks.forEach((task) => {
		gui1.showTask(task);
		gui2.showTask(task);
	});

	const taskbox1 = new TaskBox(tasksmodaleboxdiv1);
	const taskbox2 = new TaskBox(tasksmodaleboxdiv2);

	taskbox1.allstatuses = allStatuses;
	taskbox2.allstatuses = allStatuses;

	gui1.newTaskBtnCB = () => {
		taskbox1.show();
	}
	
	gui2.newTaskBtnCB = () => {
		taskbox2.show();
	}

	async function submitCB(task, tb) {
		let newTask = await api.addTask(task);
		if (newTask) {
			gui1.showTask(newTask);
			gui2.showTask(newTask);
			tb.close();
		} else {
			alert("Something went wrong...")
		}
	}
	taskbox1.onsubmitCallback = (task) => {
		submitCB(task, taskbox1);
	}
	taskbox2.onsubmitCallback = (task) => {
		submitCB(task, taskbox2);
	}

	let deleteCallback = async (id) => {
		if (await api.deleteTask(id)) {
			gui1.removeTask(id);
			gui2.removeTask(id);
		} else {
			alert("Something went wrong...")
		}
	}
	gui1.deleteTaskCallback = deleteCallback;
	gui2.deleteTaskCallback = deleteCallback;

	let newStatusCallback = async (id, newStatus) => {
		if (await api.updateStatus(id, newStatus)) {
			gui1.update({ id, status: newStatus });
			gui2.update({ id, status: newStatus });
		} else {
			alert("Something went wrong...")
		}
	}
	gui1.newStatusCallback = newStatusCallback;
	gui2.newStatusCallback = newStatusCallback;
	
	gui1.disableBtn = false;
	gui2.disableBtn = false;
}

initialize();






