"use strict";

const container = document.getElementById("taskcontainer");
const gui = new GuiHandler(container);

const statuses = ["WAITING","ACTIVE","DONE"];

const tasks = [
    {"id":1,"title":"Clean bathroom","status":"WAITING"},
    {"id":2,"title":"Wash clothes","status":"DONE"},
    {"id":3,"title":"Swipe floors","status":"ACTIVE"}
];

gui.allstatuses = statuses;
tasks.forEach((task) => {gui.showTask(task)});


gui.deleteTaskCallback = (id) => {console.log(`User has approved the deletion of task with id ${id}.`)}
gui.deleteTaskCallback = (id) => {console.log(`Observer, task with id ${id} is not removed from the view!`)}


gui.newStatusCallback = (id,newStatus) => {console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`)}
gui.newStatusCallback = (id,newStatus) => {console.log(`Observer, task with id ${id} is not set to ${newStatus} in the view!`)}


const tasksmodaleboxdiv = document.getElementById("taskbox")
const tasknewbutton = document.getElementById("newtask").getElementsByTagName("button")[0]

tasknewbutton.addEventListener("click",(event) => {taskbox.show()},true)
const taskbox = new TaskBox(tasksmodaleboxdiv)	// Er det ok at jeg endret denne fra ingenting til const?
taskbox.allstatuses = statuses
taskbox.onsubmitCallback = (task) => {
    console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`)
    gui.showTask(task)
    taskbox.close()
}

document.getElementById('newtask').getElementsByTagName("button")[0].disabled=false