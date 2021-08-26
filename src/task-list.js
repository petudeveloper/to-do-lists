/* eslint-disable no-restricted-syntax */
import Task from './task.js';

export default class ListOfTasks {
  constructor() {
    this.tasks = (localStorage.myTasks != null) ? JSON.parse(localStorage.myTasks) : [];
    this.populateList();
  }

  updateLocalStorage() {
    localStorage.myTasks = JSON.stringify(this.tasks);
  }


  addTask() {
    const newTask = document.getElementById('new-task');
    this.tasks.push(new Task(newTask.value, this.tasks.length));
    this.updateLocalStorage();
    this.populateList();
    newTask.value = '';
  }

  populateList() {
    const tasksList = document.getElementById('list-of-tasks');
    tasksList.innerHTML = '';
    for (const task of this.tasks) {
      tasksList.innerHTML += `
              <li class="w-100 p-3 border-bottom">
                  <div class="w-100 d-flex justify-content-between">
                      <div>
                          <input type="checkbox" id="check-${task.index}" ${task.completed ? 'checked' : ''}>
                          <span id="span-${task.index}" class="px-2 ${task.completed ? 'task-completed' : ''}">${task.description}</span>
                      </div>
                      <i class="fas fa-ellipsis-v text-secondary"></i>
                  </div>
              </li>
              `;
    }
    for (const task of this.tasks) {
      const checkbox = document.getElementById(`check-${task.index}`);
      const span = document.getElementById(`span-${task.index}`);
      checkbox.addEventListener('change', () => {
        this.tasks[task.index].completed = !this.tasks[task.index].completed;
        span.classList.toggle('task-completed');
        this.updateLocalStorage();
      });
    }
  }
}

