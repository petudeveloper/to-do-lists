export default class Task {
  constructor(description = '', index = 0, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }
}