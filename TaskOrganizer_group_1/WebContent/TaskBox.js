"use strict";

class TaskBox {

	constructor(modaltaskboxdiv) {
		this.submitCallBacks = [];		// ???
		this.modaltaskboxdiv = modaltaskboxdiv;
		this.span = this.modaltaskboxdiv.firstElementChild.firstElementChild;
		this.body = this.modaltaskboxdiv.parentNode;
		this.newTaskBtn = this.body.firstElementChild.firstElementChild.nextElementSibling;
		this.addTaskBtn = this.span.nextElementSibling.nextElementSibling.firstElementChild;
		this.tableNode = this.span.nextElementSibling;
		this.selectNode = this.tableNode.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;
		this.inputNode = this.tableNode.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;

		this.span.onclick = (() => {
			this.close();
		});

		window.onclick = (() => {
			if (event.target == this.modaltaskboxdiv) {
				this.close();
			}
		});

		this.addTaskBtn.addEventListener("click", () => {
			let newTask = { "title": this.inputNode.value, "status": this.selectNode.value };
			this.submitCallBacks.forEach((sCB) => {
				sCB(newTask);
			});
		});
	}

	set allstatuses(statuses) {
		this.statuses = statuses;
		this.statuses.forEach((s => {
			let optionNode = document.createElement("option");
			this.selectNode.appendChild(optionNode);
			optionNode.setAttribute("value", s);
			let textNode = document.createTextNode(s);
			optionNode.appendChild(textNode);
		}));
	}

	show() {
		this.modaltaskboxdiv.style.display = "block";
	}

	set onsubmitCallback(sCB) {		//Setter that adds a callback to run when the Add task button is clicked.
		this.submitCallBacks.push(sCB);
	}

	close() {						//Method for calling after a new task has been added by Add task button
		this.modaltaskboxdiv.style.display = "none";
	}
}


