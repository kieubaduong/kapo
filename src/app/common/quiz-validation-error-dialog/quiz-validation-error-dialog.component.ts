import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import KapoError from 'src/models/kapo.error';

@Component({
  selector: 'app-quiz-validation-error-dialog',
  templateUrl: './quiz-validation-error-dialog.component.html',
  styleUrls: ['./quiz-validation-error-dialog.component.css'],
})
export class QuizValidationErrorDialogComponent {
  kapoErrors: KapoError[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { kapoErrors: KapoError[] },
    public dialogRef: MatDialogRef<QuizValidationErrorDialogComponent>
  ) {
    this.kapoErrors = data.kapoErrors;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
