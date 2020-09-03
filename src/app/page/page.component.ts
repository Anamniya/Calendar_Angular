import { Component, OnInit, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
  year: number = new Date().getFullYear();
  curMonth: number = new Date().getMonth();
  curDate: number = new Date().getDate();
  months: string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  days: number[] = [];
  monthForToday: number = new Date().getMonth();
  yearForToday: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    this.genCalendar()
  }

  @Input() input: InputComponent;

  genCalendar() {
    this.days = [];
    let lastDayInMonth = new Date(this.year, this.curMonth + 1, 0).getDate();
    let firstDayOfWeek = [7, 1, 2, 3, 4, 5, 6][
      new Date(this.year, this.curMonth, 1).getDay()
    ];

    for (let i: number = 1; i < firstDayOfWeek; i++) {
      this.days.push(null);
    }

    for (let i: number = 1; i <= lastDayInMonth; i++) {
      this.days.push(i);
    }
  };

  next() {
    this.curMonth = this.curMonth < 11 ? this.curMonth + 1 : 0;
    if (this.curMonth == 0) {
      this.year = this.year + 1;
    }
    this.genCalendar();
  };

  prew() {
    this.curMonth = this.curMonth > 0 ? this.curMonth - 1 : 11;
    if (this.curMonth == 11) {
      this.year = this.year - 1;
    }
    this.genCalendar();
  };

  open(e) {
    let selDate: any = e.target.textContent;
    let fullDate: Date = new Date([this.year, this.curMonth + 1, selDate].join('.'))
    this.input.setDate(fullDate)
  }
}
