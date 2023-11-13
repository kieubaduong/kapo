import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-field',
  templateUrl: './quiz.field.component.html',
  styleUrls: ['./quiz.field.component.css']
})
export class QuizFieldComponent {
  @Input() timeLimit: string = '5';
  @Input() points = 'standard';
  @Input() answerOptions = 'single-select';

  @Output() timeLimitChange = new EventEmitter<string>();
  @Output() pointsChange = new EventEmitter<string>();
  @Output() answerOptionsChange = new EventEmitter<string>();

  onTimeLimitChange(newTimeLimit: string) {
    this.timeLimit = newTimeLimit;
    this.timeLimitChange.emit(this.timeLimit);
    console.log('Time limit changed to:', this.timeLimit);
  }

  onPointsChange(newPoints: string) {
    this.points = newPoints;
    this.pointsChange.emit(this.points);
    console.log('Points changed to:', this.points);
  }
  
  onAnswerOptionsChange(newAnswerOptions: string) {
    this.answerOptions = newAnswerOptions;
    this.answerOptionsChange.emit(this.answerOptions);
    console.log('Answer options changed to:', this.answerOptions);
  }
}
