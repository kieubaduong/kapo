import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import QuestionReport, { PlayerReport } from 'src/models/question.report';
import { QuestionReportDetailDialogComponent } from '../question-report-detail-dialog/question-report-detail-dialog.component';
import { ReportQuestionDTO } from 'src/DTO/report.question.dto';
import { ReportService } from 'src/service/report.service';
import { AnswerReportDTO } from 'src/DTO/answer.report.dto';
import { formatQuestionType } from 'src/util';

@Component({
  selector: 'app-questions-report',
  templateUrl: './questions-report.component.html',
  styleUrls: ['./questions-report.component.css'],
})
export class QuestionsReportComponent implements OnInit {
  @Input() gameId: number = 0;

  questionReports: ReportQuestionDTO[] = [];
  displayedData: ReportQuestionDTO[] = [];
  searchQuestionTitle: string = '';
  isExpandedView = true;
  isNotExpandedView = () => !this.isExpandedView;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    ReportService.getQuestionReports(this.gameId).subscribe(reports => {
      this.questionReports = (reports.data ?? []).map(report => ({
        ...report,
        type: formatQuestionType(report.type),
      }));
      this.displayedData = [...this.questionReports];
    });
  }

  handleViewChange(event: MatTabChangeEvent) {
    this.isExpandedView = event.index === 0;
  }

  handleTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.displayedData = this.questionReports;
    } else if (event.index === 1) {
      this.displayedData = this.questionReports.filter(
        (data) => data.correctCount / data.answersCount <= 0.3
      );
    }
    if (this.searchQuestionTitle !== '') {
      this.performSearch();
    }
  }

  getTotalCount(answersReport: AnswerReportDTO[]): number {
    return answersReport.reduce((total, answer) => total + answer.count, 0);
  }

  performSearch() {
    const filterValue = this.searchQuestionTitle.trim().toLowerCase();
    this.displayedData = this.questionReports.filter((data) =>
      data.content.toLowerCase().includes(filterValue)
    );
  }

  clearSearch() {
    this.searchQuestionTitle = '';
    this.performSearch();
  }

  openDialog(questionReport: ReportQuestionDTO) {
    this.dialog.open(QuestionReportDetailDialogComponent, {
      data: {
        questionId: questionReport.id,
        gameId: questionReport.gameId
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90%',
      width: '95%',
    });
  }
}
