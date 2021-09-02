/* eslint-disable no-restricted-syntax */
import Task from './task.js';

export default class ListOfTasks {
  constructor() {
    this.tasks = (localStorage.myTasks != null) ? JSON.parse(localStorage.myTasks) : [];
  }

  updateLocalStorage() {
    localStorage.myTasks = JSON.stringify(this.tasks);
  }

  #updateIndexes() {
    let i = 0;
    this.tasks.forEach((task) => {
      task.index = i;
      i += 1;
    });
    this.updateLocalStorage();
    this.populateList();
  }

  // function for adding a new task
  addTask() {
    const newTask = document.getElementById('new-task');
    this.tasks.push(new Task(newTask.value, this.tasks.length));
    this.updateLocalStorage();
    this.populateList();
    newTask.value = '';
  }

  // function for updating task "completed" status
  updateCompleteStatus() {
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

  // function for editing task descriptions
  editTask() {
    for (const task of this.tasks) {
      const taskDescription = document.getElementById(`span-${task.index}`);
      taskDescription.addEventListener('change', () => {
        task.description = taskDescription.value;
        this.updateLocalStorage();
      });
    }
  }

  // function for deleting a task
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.#updateIndexes();
  }

  // function for the "Clear all completed" button
  clearAll() {
    const clearAllElement = document.getElementById('clear-all');
    clearAllElement.addEventListener('click', () => {
      this.tasks = this.tasks.filter((task) => task.completed === false);
      this.#updateIndexes();
    });
  }

  // function for rendering list of tasks
  populateList() {
    const tasksList = document.getElementById('list-of-tasks');
    tasksList.innerHTML = '';
    for (const task of this.tasks) {
      tasksList.innerHTML += `
              <li class="w-100 p-3 border-bottom">
                  <div id="div-${task.index}" class="w-100 d-flex justify-content-between">
                      <div class="w-100">
                          <input type="checkbox" id="check-${task.index}" ${task.completed ? 'checked' : ''}>
                          <input type="text" id="span-${task.index}" class="w-75 px-2 border-0 ${task.completed ? 'task-completed' : ''}" value="${task.description}"></input>
                      </div>
                      <i id="icon-${task.index}" class="clickable fas fa-ellipsis-v text-secondary"></i>
                      <i id="trash-icon-${task.index}" class="clickable d-none far fa-trash-alt"></i>
                  </div>
              </li>
              `;
    }
    // Event listeners
    for (const task of this.tasks) {
      const divContainer = document.getElementById(`div-${task.index}`);
      const taskIcon = document.getElementById(`icon-${task.index}`);
      const trash = document.getElementById(`trash-icon-${task.index}`);

      divContainer.addEventListener('focusin', () => {
        taskIcon.classList.add('d-none');
        trash.classList.remove('d-none');
      });
      divContainer.addEventListener('focusout', () => {
        setTimeout(() => {
          taskIcon.classList.add('d-block');
          taskIcon.classList.remove('d-none');
          trash.classList.add('d-none');
        }, 100);
      });

      // Deleting
      trash.addEventListener('click', () => this.deleteTask(task.index));
    }

    this.editTask();
    this.updateCompleteStatus();
    this.clearAll();
  }
}
