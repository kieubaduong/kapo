import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import QuestionReport from 'src/models/question.report';

@Component({
  selector: 'app-question-report-detail-dialog',
  templateUrl: './question-report-detail-dialog.component.html',
  styleUrls: ['./question-report-detail-dialog.component.css']
})
export class QuestionReportDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: QuestionReport) { }

}
