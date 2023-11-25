import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add.question.dialog',
  templateUrl: './add.question.dialog.component.html',
  styleUrls: ['./add.question.dialog.component.css']
})
export class AddQuestionDialogComponent {
  selectedOption: string = 'Quiz';

  @Output() optionSelected = new EventEmitter<string>();

  constructor(public dialogRef: MatDialogRef<AddQuestionDialogComponent>) { }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(this.selectedOption);
    this.dialogRef.close(this.selectedOption);
  }
}
