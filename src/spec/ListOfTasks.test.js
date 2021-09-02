/**
 * @jest-environment jsdom
 */

import ListOfTasks from '../task-list.js';

// Arrange
const myMockList = new ListOfTasks();

beforeAll(() => {
  global.localStorage.myTasks = {};
  document.body.innerHTML = `
  <div class="main-container">
    <h1 class="text-center">My To-do list!</h1>
    <div id="list-container" class="my-5 p-0 shadow">
        <div class="d-flex justify-content-between p-3 border-bottom">
            <h2 class="fs-6 fw-normal m-0">Today's To Do</h2>
            <i class="fas fa-sync text-secondary sync-icon"></i>
        </div>
        <div class="p-3 border-bottom d-flex justify-content-between">
            <form class="w-100 d-flex justify-content-between">
                <input class="w-100 border-0 fw-lighter fst-italic" type="text" id="new-task" name="new-task" placeholder="Add to your list...">
                <input class="bg-white border-0" type="submit" id="new-task-btn" name="new-task-btn" value="" title="Press ENTER to submit">
                <i class="fas fa-level-down-alt text-secondary sync-icon me-2"></i>
            </form>
        </div>
        <ul id="list-of-tasks" class="p-0 m-0"></ul>
        <div id="clear-all" class="clickable clear-container text-center w-100 p-3">
            <a class="text-secondary text-decoration-none fw-light">Clear all completed</a>
        </div>
    </div>
  </div>
  `;
});

describe('Add task', () => {
  test('Should be define', () => {
    expect(myMockList.addTask).toBeDefined();
  });

  test('should add new task to the localstorage', () => {
    const newTask = document.getElementById('new-task');
    newTask.value = 'Task 1';
    myMockList.addTask();

    expect(myMockList.tasks.length).toBe(1);
  });
});

describe('Delete task', () => {
  test('Should be define', () => {
    expect(myMockList.deleteTask).toBeDefined();
  });

  test('should delete task from localstorage', () => {
    const listLength = myMockList.tasks.length;
    myMockList.deleteTask();

    expect(myMockList.tasks.length).toBe(listLength - 1);
  });

  describe('Editing task', () => {
    test('Should be define', () => {
      expect(myMockList.editTask).toBeDefined();
    });

    test('Should edit an existing task', () => {
      const newTask = document.getElementById('new-task');
      newTask.value = 'Task 1';
      myMockList.addTask();

      myMockList.tasks[0].description = 'task 2';

      expect(myMockList.tasks[0].description).toBe('task 2');
    });
  });
});