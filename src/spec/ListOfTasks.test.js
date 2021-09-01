/**
 * @jest-environment jsdom
 */

import ListOfTasks from '../task-list.js';
import LocalStorageMock from '../mock';

// Arrange

global.localStorage = new LocalStorageMock();
const myMockList = new ListOfTasks();
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


test('Add task should be define', () => {
  expect(myMockList.addTask).toBeDefined();
});