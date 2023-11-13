import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-time-limit-component',
  templateUrl: './time.limit.component.html',
  styleUrls: ['./time.limit.component.css']
})
export class TimeLimitComponent {
  @Input() timeLimit: string = '5';
  @Output() timeLimitChange = new EventEmitter<string>();

  onTimeLimitChange(newTimeLimit: string) {
    this.timeLimit = newTimeLimit;
    this.timeLimitChange.emit(this.timeLimit);
  }
}
