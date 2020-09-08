"use strict";

class GuiHandler {
	
	constructor(container) {
		this.container = container;
		this.deleteCallBacks = [];
		this.statusCallBacks = [];
		this.tasks = [];
		this.msgParagraph = this.getMsgParagraph();
		this.tableRoot = this.initializeTable();
	}	
	getMsgParagraph() {
		let msgDiv = this.container.firstElementChild;
		return msgDiv.firstElementChild;
	}
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

	set allstatuses (statuses) {
		this.statuses = statuses;
	}
	set deleteTaskCallback (deleteCB) {
		this.deleteCallBacks.push(deleteCB);
	}
	set newStatusCallbask (statusCB) {
		this.statusCallBacks.push(statusCB);
	}
	
	showTask(task) {
		
		this.tasks.forEach( (t) => {
			if (t.id === task.id) {
				console.log("Ups, this id is already on the list!");
				return;
			}
		});
		this.tasks.push(task);
		let no = this.tasks.length;
		this.msgParagraph.innerHTML = "Found " + no + " tasks."
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
		tdNode3.appendChild(selectNode);
		let optionNode = document.createElement("option");
		selectNode.appendChild(optionNode);
		optionNode.setAttribute("value", "0");
		let text = document.createTextNode("<Modify>");
		optionNode.appendChild(text);
		statuses.forEach((s => {
			let optionNode = document.createElement("option");
			selectNode.appendChild(optionNode);
			optionNode.setAttribute("value", s);
			let text = document.createTextNode(s);
			optionNode.appendChild(text);
		}));
		let tdNode4 = document.createElement("td");
		trNode.appendChild(tdNode4);
		let buttonNode = document.createElement("button");
		tdNode4.appendChild(buttonNode);
		buttonNode.setAttribute("type", "button");
		let removeNode = document.createTextNode("Remove");
		buttonNode.appendChild(removeNode);
	
	}
	update(task) {
		let taskId = document.querySelector("tr[data-identity = '" + task.id +"']");
		let status = taskId.firstElementChild.nextElementSibling;
		
	}
	
	
	
	
	
	
	
	
	
	
}