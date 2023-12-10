import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import QuestionReport from 'src/models/question.report';

@Component({
  selector: 'app-question-report-detail-dialog',
  templateUrl: './question-report-detail-dialog.component.html',
  styleUrls: ['./question-report-detail-dialog.component.css']
})
export class QuestionReportDetailDialogComponent {
  displayedColumns: string[] = ['player', 'answered', 'correct', 'time', 'points'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public questionReport: QuestionReport,
    public dialogRef: MatDialogRef<QuestionReportDetailDialogComponent>
  ) { }


  closeDialog() {
    this.dialogRef.close();
  }
}
