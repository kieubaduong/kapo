import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { QuestionReportShortDTO } from 'src/DTO/question.report.short.dto';
import { ReportSummaryDTO } from 'src/DTO/report.summary.dto';
import { formatQuestionType } from 'src/util';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css'],
})
export class SummaryReportComponent {
  @Input() reportSummary!: ReportSummaryDTO;

  difficultQuestion: QuestionReportShortDTO = new QuestionReportShortDTO();
  @ViewChild('progress') progress!: ElementRef;

  percent = 25;
  difficultAnswerCorrectPercent: number = 25;

  ngOnInit() {
    this.reportSummary.game.type = formatQuestionType(this.reportSummary.game.type);

    let minCorrectCount = this.reportSummary.difficultQuestions[0].correctCount;
    this.difficultQuestion = this.reportSummary.difficultQuestions[0];
    for (let i = 1; i < this.reportSummary.difficultQuestions.length; i++) {
      if (
        this.reportSummary.difficultQuestions[i].correctCount < minCorrectCount
      ) {
        minCorrectCount = this.reportSummary.difficultQuestions[i].correctCount;
        this.difficultQuestion = this.reportSummary.difficultQuestions[i];
      }
    }
    this.difficultAnswerCorrectPercent =
      (this.difficultQuestion.correctCount /
        this.reportSummary.totalPlayerCount) *
      100;
  }

  ngAfterViewInit() {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (this.percent / 100) * circumference;
    this.progress.nativeElement.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }

  setProgress(percent: number) {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (percent / 100) * circumference;
    this.progress.nativeElement.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }
}
