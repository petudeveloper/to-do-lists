/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
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

  #moveArrayItemToNewIndex(oldIndex, newIndex) {
    if (newIndex >= this.tasks.length) {
      let k = newIndex - this.tasks.length + 1;
      while (k--) {
        this.tasks.push(undefined);
      }
    }
    this.tasks.splice(newIndex, 0, this.tasks.splice(oldIndex, 1)[0]);
    this.updateLocalStorage();
  }

  // function for adding a new task
  addTask() {
    const newTask = document.getElementById('new-task');
    this.tasks.push(new Task(newTask.value, this.tasks.length));
    this.updateLocalStorage();
    this.#updateIndexes();
    newTask.value = '';
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

    // Helper function for rendering adding listener methods
    #addListeners() {
    for (const task of this.tasks) {
      const divContainer = document.getElementById(`div-${task.index}`);
      const taskIcon = document.getElementById(`icon-${task.index}`);
      const trash = document.getElementById(`trash-icon-${task.index}`);
      const taskDescription = document.getElementById(`span-${task.index}`);
      const checkbox = document.getElementById(`check-${task.index}`);
      const listContainer = document.getElementById(`li-${task.index}`);

      divContainer.addEventListener('focusin', () => {
        taskIcon.classList.add('d-none');
        trash.classList.remove('d-none');
        listContainer.classList.toggle('listSelected');
      });
      divContainer.addEventListener('focusout', () => {
        setTimeout(() => {
          taskIcon.classList.add('d-block');
          taskIcon.classList.remove('d-none');
          trash.classList.add('d-none');
          listContainer.classList.toggle('listSelected');
        }, 100);
      });

      // Updating task "completed" status
      checkbox.addEventListener('change', () => {
        this.tasks[task.index].completed = !this.tasks[task.index].completed;
        taskDescription.classList.toggle('task-completed');
        this.updateLocalStorage();
      });

      // Changing(updating) task description
      taskDescription.addEventListener('change', () => {
        task.description = taskDescription.value;
        this.updateLocalStorage();
      });

      // Deleting
      trash.addEventListener('click', () => this.deleteTask(task.index));

      // Dragg and Drop
      listContainer.addEventListener('dragstart', () => {
        listContainer.classList.add('dragging');
      });
      listContainer.addEventListener('dragend', (e) => {
        const element = e.target;
        const ul = [...document.querySelectorAll('ul li')];
        const newIndex = ul.findIndex((li) => li.id === element.id);
        this.#moveArrayItemToNewIndex(task.index, newIndex);
        listContainer.classList.remove('dragging');
        this.#updateIndexes();
        this.updateLocalStorage();
      });
    }
  }

    // function for drag task feature
    dragTask() {
      function getDragAfterElement(y) {
        const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging')];
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
          }
          return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
      }
      const tasksList = document.getElementById('list-of-tasks');
      tasksList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          tasksList.appendChild(draggable);
        } else {
          tasksList.insertBefore(draggable, afterElement);
        }
      });
    }

    // function for rendering list of tasks
    populateList() {
      const tasksList = document.getElementById('list-of-tasks');
      tasksList.innerHTML = '';
      for (const task of this.tasks) {
        tasksList.innerHTML += `
              <li id="li-${task.index}" class="w-100 p-3 border-bottom draggable" draggable="true">
                  <div id="div-${task.index}" class="w-100 d-flex justify-content-between">
                      <div class="w-100">
                          <input type="checkbox" id="check-${task.index}" ${task.completed ? 'checked' : ''}>
                          <input type="text" id="span-${task.index}" class="bg-transparent w-75 px-2 border-0 ${task.completed ? 'task-completed' : ''}" value="${task.description}"></input>
                      </div>
                      <i id="icon-${task.index}" class="clickable fas fa-ellipsis-v text-secondary"></i>
                      <i id="trash-icon-${task.index}" class="clickable d-none far fa-trash-alt"></i>
                  </div>
              </li>
              `;
      }
      this.clearAll();
      this.#addListeners();
      this.dragTask();
    }
}
