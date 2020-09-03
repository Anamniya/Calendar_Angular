import { Component, OnInit, Input } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  fullDate: any = "";
  text: string = "";
  originalIndex: string = "";
  edit: boolean = false;
  visible: boolean = false;

  constructor() { }
  ngOnInit() {
  }

  @Input() tasks: TasksComponent;

  close() {
    this.text = ''
    this.visible = false;
  }

  sendTask(text) {
    this.text = text

    let fultask = {
      value: this.text,
      fullDate: this.fullDate
    }
    if (this.edit == true) {
      fultask["originalIndex"] = this.originalIndex
    }

    this.tasks.pushTask(fultask)
    this.visible = false;
    this.text = '';
    this.edit = false;
  }

  setDate(date) {
    this.visible = true;
    this.fullDate = date
  }

  getEditValue(task) {
    this.text = task.val;
    this.fullDate = new Date(parseInt(task.mskey));
    this.originalIndex = task.originalIndex;
    this.edit = true;
    this.visible = true;
  }
}
