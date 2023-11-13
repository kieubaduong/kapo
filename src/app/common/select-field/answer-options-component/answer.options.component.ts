import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-answer-options-component',
  templateUrl: './answer.options.component.html',
  styleUrls: ['./answer.options.component.css']
})
export class AnswerOptionsComponent {
  @Input() answerOptions = 'single-select';
  @Output() answerOptionsChange = new EventEmitter<string>();

  onAnswerOptionsChange(value: string) {
    this.answerOptions = value;
    this.answerOptionsChange.emit(this.answerOptions);
  }

}
