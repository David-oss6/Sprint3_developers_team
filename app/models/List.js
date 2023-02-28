/*
 _taskList:
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:"1232134" } },
*/

import { Task } from './Task.js';
import 'colors';

class List {
  _taskList = {};

  constructor() {
    this._taskList = {};
  }

  get listArray() {
    let arrayList = [];
    Object.keys(this._taskList).forEach((key) => {
      // Enchufamos el contenido de la posición [key], que es toda la tarea
      const taskItem = this._taskList[key];
      arrayList.push(taskItem);
    });
    return arrayList;
  }

  deleteTask(id = '') {
    if (this._taskList[id]) {
      delete this._taskList[id];
    }
  }

  loadTaskArray(tasks = []) {
    tasks.forEach((item) => {
      this._taskList[item.id] = item;
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._taskList[task.id] = task;
  }

  listAllTasks() {
    console.log();
    this.listArray.forEach((tarea, i) => {
      const index = `${i + 1}`.green;
      const { description, completedIn } = tarea;
      const status = completedIn ? 'Completed'.green : 'Pending'.red;
      console.log(`${index} ${description} --> ${status}`);
    });
  }

  listPendingCompleted(completed = true) {
    let counter = 0;
    console.log();
    this.listArray.forEach((taskItem) => {
      const { description, completedIn } = taskItem;
      const status = completedIn ? `Completed: ${taskItem.completedIn}`.green : 'Pending'.red;
      if (completed) {
        if (completedIn) {
          // show completed
          counter += 1;
          console.log(`${(counter + '.').green} ${description} --> ${status}`);
        }
      } else {
        if (!completedIn) {
          // show pending
          counter += 1;
          console.log(`${(counter + '.').green} ${description} --> ${status}`);
        }
      }
    });
  }

  markTaskComplete(ids = []) {
    ids.forEach((id) => {
      if (!this._taskList[id].completedIn) {
        this._taskList[id].completedIn = new Date().toLocaleString();
      }
    });
    // make sure every task NOT MARKED as complete is set to PENDING
    this.listArray.forEach((taskItem) => {
      if (!ids.includes(taskItem.id)) {
        this._taskList[taskItem.id].completedIn = null;
      }
    });
  }
}
export { List };
