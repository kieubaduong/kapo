import { Component } from '@angular/core';
import KapoError from 'src/models/kapo.error';

@Component({
  selector: 'app-quiz-validation-error-dialog',
  templateUrl: './quiz-validation-error-dialog.component.html',
  styleUrls: ['./quiz-validation-error-dialog.component.css'],
})
export class QuizValidationErrorDialogComponent {
  kapoErrors: KapoError[] = [];

  constructor() {
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
        'Quiz title is required',
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
    this.kapoErrors.push(
      new KapoError('Quiz', 'Quiz title is required', [
        'Quiz title is required',
      ])
    );
  }
}
