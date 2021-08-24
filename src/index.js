import './style.css';
import Task from "./task";

class listOfTasks {
    constructor() {
        this.tasks = (localStorage.myTasks != null) ? JSON.parse(localStorage.myTasks) : [];
        this.populateList();
    }

    updateLocalStorage() {
        localStorage.myTasks = JSON.stringify(this.tasks);
    }

    addTask() {
        const newTask = document.getElementById('new-task');
        this.tasks.push(new Task (newTask.value, this.tasks.length));
        this.updateLocalStorage();
        this.populateList();
        newTask.value = '';
    }

    populateList() {
        const tasksList = document.getElementById('list-of-tasks');
        tasksList.innerHTML = '';
        for (const task of this.tasks){
            tasksList.innerHTML += `
            <li>
                <span>${task.description}: </span>
                <span>${task.index}</span>
            </li>
            `;
        };
    }
}

const myListOfTasks = new listOfTasks();


const newTaskButton = document.getElementById('new-task-btn');
newTaskButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    myListOfTasks.addTask()
});
