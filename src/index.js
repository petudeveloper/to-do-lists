import './style.css';
import Task from "./task";

class listOfTasks {
    constructor() {
        this.tasks = (localStorage.myTasks != null) ? JSON.parse(localStorage.myTasks) : [];
    }

    addTask(){
        const newTask = document.getElementById('new-task');
        this.tasks.push(new Task (newTask.value, this.tasks.length));
        this.updateLocalStorage();
        console.log(this.tasks)
    }

    updateLocalStorage() {
        localStorage.myTasks = JSON.stringify(this.tasks);
    }
}

const myListOfTasks = new listOfTasks();

const newTaskButton = document.getElementById('new-task-btn');
newTaskButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    myListOfTasks.addTask()
});
