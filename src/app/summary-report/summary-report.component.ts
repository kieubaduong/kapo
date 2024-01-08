import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { QuestionReportShortDTO } from 'src/DTO/question.report.short.dto';
import { ReportSummaryDTO } from 'src/DTO/report.summary.dto';
import { ReportUserDTO } from 'src/DTO/report.user.dto';
import { ReportService } from 'src/service/report.service';
import { formatQuestionType } from 'src/util';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css'],
})
export class SummaryReportComponent {
  @Input() reportSummary!: ReportSummaryDTO;

  needHelpPlayers: ReportUserDTO[] = [];
  notFinishedPlayers: ReportUserDTO[] = [];

  difficultQuestion: QuestionReportShortDTO = new QuestionReportShortDTO();
  @ViewChild('progress') progress!: ElementRef;

  percent = 25;
  difficultAnswerCorrectPercent: number = 25;

  constructor(private notificationService: NotificationService) {}

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
      Number(((this.difficultQuestion.correctCount /
        this.reportSummary.totalPlayerCount) *
      100).toFixed(2));

      this.getPlayersReport('need_help');
      this.getPlayersReport('not_finished');
  }

  ngAfterViewInit() {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (this.percent / 100) * circumference;
    this.progress.nativeElement.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }

  getPlayersReport(reportType: string) {
    ReportService.getPlayersReport(this.reportSummary.gameId, reportType).subscribe(
      (response) => {
        if (response.success) {
          if (reportType === 'need_help') {
            this.needHelpPlayers = response.data ?? [];
          } else if (reportType === 'not_finished') {
            this.notFinishedPlayers = response.data ?? [];
          }
        } else {
          this.notificationService.showError(`Error fetching ${reportType} players report:`);
        }
      }
    );
  }

  setProgress(percent: number) {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (percent / 100) * circumference;
    this.progress.nativeElement.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }
}
