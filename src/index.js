/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import './style.css';
import './bootstrap.min.css';
import './popper.min.js';
import ListOfTasks from './task-list.js';

const myListOfTasks = new ListOfTasks();

window.onload = myListOfTasks.populateList.apply(myListOfTasks);

const newTaskButton = document.getElementById('new-task-btn');
newTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  myListOfTasks.addTask();
});
