"use strict";

class GuiHandler {
	
	constructor(container) {
		this.container = container;
		this.deleteCallBacks = [];
		this.statusCallBacks = [];
		this.tableRoot = this.initializeTable();
	}	
	set allstatuses (statuses) {
		this.statuses = statuses;
	}
	set deleteTaskCallback (deleteCB) {
		this.deleteCallBacks.push(deleteCB);
	}
	set newStatusCallback (statusCB) {
		this.statusCallBacks.push(statusCB);
	}
	set newTaskBtnCB (callback) {
		this.container.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', callback);
	}
	set disableBtn (disabled) {
		this.container.firstElementChild.nextElementSibling.firstElementChild.disabled = disabled;
	}

	// private helper methods
	initializeTable() {
		let tableDiv = this.container.firstElementChild.nextElementSibling.nextElementSibling;
		let tableNode = document.createElement("table");
		tableDiv.appendChild(tableNode);
		let theadNode = document.createElement("thead");
		tableNode.appendChild(theadNode);
		let trNode = document.createElement("tr");
		theadNode.appendChild(trNode);
		let thNode = document.createElement("th");
		trNode.appendChild(thNode);
		let taskTextNode = document.createTextNode("Task");
		thNode.appendChild(taskTextNode);
		let thNode2 = document.createElement("th");
		trNode.appendChild(thNode2);
		let statusTextNode = document.createTextNode("Status");
		thNode2.appendChild(statusTextNode);
		let tBodyNode = document.createElement("tbody");
		tableNode.appendChild(tBodyNode);
		return tBodyNode;
	}

	disableActiveStatus(status, node) {
		let activeNode = node.firstElementChild.nextElementSibling;
		while (activeNode != null) {
			activeNode.disabled = (activeNode.getAttribute("value") === status);
			activeNode = activeNode.nextElementSibling;
		}
	}
	
	showNoOfTasks() {
		let msgDiv = this.container.firstElementChild;
		let no = this.tableRoot.childNodes.length;
		msgDiv.firstElementChild.innerText = "Found " + no + " tasks.";	
	}
	
	showTask(task) {		// add a task to the list
		let trNode = document.createElement("tr");
		this.tableRoot.insertBefore(trNode, this.tableRoot.firstElementChild);
		trNode.setAttribute("data-identity", task.id);
		let tdNode = document.createElement("td");
		trNode.appendChild(tdNode);
		let taskText = document.createTextNode(task.title);
		tdNode.appendChild(taskText);
		let tdNode2 = document.createElement("td");
		trNode.appendChild(tdNode2);
		let statusText = document.createTextNode(task.status);
		tdNode2.appendChild(statusText);
		let tdNode3 = document.createElement("td");
		trNode.appendChild(tdNode3);
		let selectNode = document.createElement("select");
		selectNode.addEventListener("change", (event) => {
			if (window.confirm("Set ''" + task.title + "' to '" + event.target.value + "?")) {
				this.statusCallBacks.forEach( (sCB) => {
					sCB(task.id, event.target.value);
				});
			}
		});
		tdNode3.appendChild(selectNode);
		let optionNode = document.createElement("option");
		selectNode.appendChild(optionNode);
		optionNode.setAttribute("value", "0");
		let textNode = document.createTextNode("<Modify>");
		optionNode.appendChild(textNode);
		this.statuses.forEach((s => {
			let optionNode = document.createElement("option");
			selectNode.appendChild(optionNode);
			optionNode.setAttribute("value", s);
			let textNode = document.createTextNode(s);
			optionNode.appendChild(textNode);
		}));
		this.disableActiveStatus(task.status, selectNode);
		let tdNode4 = document.createElement("td");
		trNode.appendChild(tdNode4);
		let buttonNode = document.createElement("button");
		tdNode4.appendChild(buttonNode);
		buttonNode.setAttribute("type", "button");
		let removeNode = document.createTextNode("Remove");
		buttonNode.appendChild(removeNode);
		
		buttonNode.addEventListener("click", () => {
			if (window.confirm("Delete task '" + task.title + "'?")) {
				this.deleteCallBacks.forEach( (dCB) => {
					dCB(task.id);
				});
			}
		});
		this.showNoOfTasks();
	}
	
	update(task) {
		let taskId = this.tableRoot.querySelector("tr[data-identity = '" + task.id +"']");
		let statusNode = taskId.firstElementChild.nextElementSibling;
		statusNode.firstChild.nodeValue = task.status;
		let selectNode = statusNode.nextElementSibling.firstElementChild;
		this.disableActiveStatus(task.status, selectNode);
	}
	
	removeTask(id) {
		let taskNode = this.tableRoot.querySelector("tr[data-identity = '" + id +"']");
		taskNode.remove();
		this.showNoOfTasks();
	}
	
	noTask() { //Tells GuiHandler that the list of tasks are empty, e.g. when the database has no tasks.
		while (this.tableRoot.firstElementChild != null) {
			this.tableRoot.firstElementChild.remove();
		}
		this.showNoOfTasks();
	}
	
}