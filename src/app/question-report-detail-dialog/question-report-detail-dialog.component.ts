import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportQuestionDetailDTO } from 'src/DTO/report.question.detail.dto';
import QuestionReport from 'src/models/question.report';
import { ReportService } from 'src/service/report.service';

@Component({
  selector: 'app-question-report-detail-dialog',
  templateUrl: './question-report-detail-dialog.component.html',
  styleUrls: ['./question-report-detail-dialog.component.css']
})
export class QuestionReportDetailDialogComponent implements OnInit {
  displayedColumns: string[] = ['player', 'answered', 'correct', 'time', 'points'];
  questionReport: ReportQuestionDetailDTO = new ReportQuestionDetailDTO();
  averageTime: number = 0;
  answers: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { gameId: number, questionId: number },
    public dialogRef: MatDialogRef<QuestionReportDetailDialogComponent>
  ) { }

  ngOnInit() {
    ReportService.getQuestionDetailReport(this.data.gameId, this.data.questionId).subscribe(response => {
      if (response.success) {
        this.questionReport = response.data ?? new ReportQuestionDetailDTO();
        this.averageTime = Number((this.questionReport.playerAnswers.reduce((total, player) => total + player.time, 0) / this.questionReport.playerAnswers.length).toFixed(2));
        this.answers = this.questionReport.answersReport.map(answer => answer.content);
        console.log(this.questionReport);
      } else {
        console.error(response.message);
      }
    });
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
