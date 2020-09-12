"use strict";

const container = document.getElementById("taskcontainer");
const gui = new GuiHandler(container);
let taskbox;


async function fetchStatuses() {
	let statusesResponse = await fetch('http://localhost:8080/TaskServices/broker/allstatuses');
	let statusesObject = await statusesResponse.json();
	gui.allstatuses = statusesObject.allstatuses;
	let tasksResponse = await fetch('http://localhost:8080/TaskServices/broker/tasklist');
	let tasksObject = await tasksResponse.json();

	tasksObject.tasks.forEach((task) => { gui.showTask(task) });
	taskbox = new TaskBox(tasksmodaleboxdiv);
	taskbox.allstatuses = statusesObject.allstatuses;

	taskbox.onsubmitCallback = async (task) => {
		let newTaskResponse = await fetch('http://localhost:8080/TaskServices/broker/task', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		});
		if (newTaskResponse.ok) {
			let newTaskObject = await newTaskResponse.json();
			gui.showTask(newTaskObject.task);
			taskbox.close();
		} else {
			alert("Something went wrong...")
		}
	}
}
fetchStatuses();

gui.deleteTaskCallback = (id) => { console.log(`User has approved the deletion of task with id ${id}.`) }
gui.deleteTaskCallback = (id) => { console.log(`Observer, task with id ${id} is not removed from the view!`) }
gui.deleteTaskCallback = async (id) => {
	let deleteTaskResponse = await fetch(`http://localhost:8080/TaskServices/broker/task/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (deleteTaskResponse.ok) {
			gui.removeTask(id)
		} else {
			alert("Something went wrong...")
		}
}

gui.newStatusCallback = async (id, newStatus) => {
	let newStatusResponse = await fetch(`http://localhost:8080/TaskServices/broker/task/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({status: newStatus})
		});
		if (newStatusResponse.ok) {
			gui.update({id, status: newStatus});
		} else {
			alert("Something went wrong...")
		}
}


const tasksmodaleboxdiv = document.getElementById("taskbox")
const tasknewbutton = document.getElementById("newtask").getElementsByTagName("button")[0]

tasknewbutton.addEventListener("click", (event) => { taskbox.show() }, true)
document.getElementById('newtask').getElementsByTagName("button")[0].disabled = false





