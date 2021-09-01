import ListOfTasks from '../task-list.js';
global.localStorage = {};

const myListMock = new ListOfTasks();

test('should exist', () => {
  // Act and Assert
  expect(myToDoListMock.addTask).toBeDefined();
});

