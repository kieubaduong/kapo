import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-true-fasle-quiz-field',
  templateUrl: './true.fasle.quiz.field.component.html',
  styleUrls: ['./true.fasle.quiz.field.component.css']
})
export class TrueFasleQuizFieldComponent {
  @Input() timeLimit: string = '5';
  @Input() points = 'standard';

  @Output() timeLimitChange = new EventEmitter<string>();
  @Output() pointsChange = new EventEmitter<string>();

  onTimeLimitChange(newTimeLimit: string) {
    this.timeLimit = newTimeLimit;
    this.timeLimitChange.emit(this.timeLimit);
  }

  onPointsChange(newPoints: string) {
    this.points = newPoints;
    this.pointsChange.emit(this.points);
  }
}
