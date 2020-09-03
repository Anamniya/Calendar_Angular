import { Component, OnInit, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  fullTask: any = {};
  taskArray: any = [];
  taskObject: any = {};
  mskey: string = "";

  constructor() { }
  ngOnInit() {
  }

  @Input() edit: InputComponent;

  addTask(taskFromInput) {
    this.fullTask = taskFromInput;
    if (this.fullTask.value !== "") {
      this.mskey = this.fullTask.fullDate.getTime();

      if (Object.keys(this.taskObject).indexOf(String(this.mskey)) == -1) {
        this.taskObject[this.mskey] = [];
      }
      this.taskObject[this.mskey].push(this.fullTask.value);

      this.fullTask = {};
    }
    this.sort();
  }

  sort() {
    let keysSort = Object.keys(this.taskObject).sort(); //массив ключей в милисекундах (mskey)
    this.taskArray = [];

    for (let key of keysSort) {
      let values = this.taskObject[key];
      for (let index in values) {
        let value = values[index];
        let dateFromKey = new Date(parseInt(key));
        let deteForTask = [
          dateFromKey.getFullYear(),
          dateFromKey.getMonth() + 1,
          dateFromKey.getDate()
        ].join(".");
        this.taskArray.push({
          date: deteForTask,
          val: value,
          originalIndex: index,
          mskey: key
        });
      }
    }
  }

  removeTask(task) {
    this.taskObject[task.mskey].splice(task.originalIndex, 1);
    if (this.taskObject[task.mskey].length == 0) {
      delete this.taskObject[task.mskey];
    }
    this.sort();
  }

  editTask(task) {
    this.edit.getEditValue(task)
  }

  writeEdited() {
    this.taskObject[this.fullTask.fullDate.getTime()][
      parseInt(this.fullTask.originalIndex)
    ] = this.fullTask.value;
    this.fullTask = {};
    this.sort();
  }

  pushTask(taskFromInput) {
    this.fullTask = taskFromInput
    if ("originalIndex" in this.fullTask) {
      this.writeEdited();
    } else {
      this.addTask(taskFromInput)
    }
  }
}