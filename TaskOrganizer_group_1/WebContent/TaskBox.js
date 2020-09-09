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
		

		this.show = (() => {
			this.modaltaskboxdiv.style.display = "block";
		});

		this.span.onclick = (() => {
			this.modaltaskboxdiv.style.display = "none";
		});

		window.onclick = (() => {
			if (event.target == this.modaltaskboxdiv) {
				this.modaltaskboxdiv.style.display = "none";
			}
		});
		
		// this.addTaskBtn.onclick =
		
		statuses.forEach((s => {
			let optionNode = document.createElement("option");
			this.selectNode.appendChild(optionNode);
			optionNode.setAttribute("value", s);
			let textNode = document.createTextNode(s);
			optionNode.appendChild(textNode);
		}));
	}

	set allstatuses(statuses) {
		this.statuses = statuses;
	}
	
	onsubmitCallback(newTask) {		//Setter that adds a callback to run when the Add task button is clicked.
		
	}
	
	close() {						//Method for calling after a new task has been added by Add task button
		this.modaltaskboxdiv.style.display = "none";
	}
}


