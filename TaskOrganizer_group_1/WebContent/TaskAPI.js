"use strict";

class TaskAPI {
	constructor(url) {
		this.url = url;
	}

	async getStatuses() {
		let statusesResponse = await fetch(this.url + 'TaskServices/broker/allstatuses');
		if (statusesResponse.ok) {
			let statusesObject = await statusesResponse.json();
			if (statusesObject.responseStatus) {
				return statusesObject.allstatuses;
			}
		}
		return undefined;
	}

	async getTasklist() {
		let tasksResponse = await fetch(this.url + 'TaskServices/broker/tasklist');
		if (tasksResponse.ok) {
			let tasksObject = await tasksResponse.json();
			if (tasksObject.responseStatus) {
				return tasksObject.tasks;
			}
		}
		return undefined;
	}

	async addTask(task) {
		let newTaskResponse = await fetch(this.url + 'TaskServices/broker/task', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		});
		if (newTaskResponse.ok) {
			let newTaskObject = await newTaskResponse.json();
			if (newTaskObject.responseStatus) {
				return newTaskObject.task;
			}
		}
		return undefined;
	}

	async deleteTask(id) {
		let deleteTaskResponse = await fetch(`${this.url}TaskServices/broker/task/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (deleteTaskResponse.ok) {
			let deleteTaskObject = await deleteTaskResponse.json();
			if (deleteTaskObject.responseStatus) {
				return true;
			}
		}
		return false;
	}

	async updateStatus(id, newStatus) {
		let newStatusResponse = await fetch(`${this.url}TaskServices/broker/task/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: newStatus })
		});
		if (newStatusResponse.ok) {
			return true;
		}
		return false;

	}
}
