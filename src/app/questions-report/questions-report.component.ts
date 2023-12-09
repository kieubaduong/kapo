import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import QuestionReport, { PlayerReport } from 'src/models/question.report';
import { QuestionReportDetailDialogComponent } from '../question-report-detail-dialog/question-report-detail-dialog.component';

@Component({
  selector: 'app-questions-report',
  templateUrl: './questions-report.component.html',
  styleUrls: ['./questions-report.component.css'],
})
export class QuestionsReportComponent {
  
  mockData: QuestionReport[] = [
    new QuestionReport(
      'What is the capital of France?',
      'https://images.unsplash.com/photo-1701762292610-3323efd62273?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Quiz',
      30,
      ['Paris', 'London', 'Berlin', 'Madrid'],
      [true, false, false, false],
      [
        new PlayerReport('Alice', 'Paris', true, 10, 100),
        new PlayerReport('Bob', 'London', false, 15, 50),
        new PlayerReport('Charlie', 'Berlin', false, 20, 50),
        new PlayerReport('Dave', 'Paris', true, 25, 100),
      ]
    ),
    new QuestionReport(
      "Who wrote 'To Kill a Mockingbird'?",
      'https://images.unsplash.com/photo-1702012464652-04c70b577758?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Quiz',
      30,
      ['Harper Lee', 'George Orwell', 'J.K. Rowling', 'Stephen King'],
      [true, false, false, false],
      [
        new PlayerReport('Alice', 'Harper Lee', true, 10, 100),
        new PlayerReport('Bob', 'George Orwell', false, 15, 50),
        new PlayerReport('Charlie', 'J.K. Rowling', false, 20, 50),
        new PlayerReport('Dave', 'Stephen King', false, 25, 50),
      ]
    ),
    new QuestionReport(
      'What is the square root of 81?',
      'https://images.unsplash.com/photo-1702012464361-b8e73df0802f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Quiz',
      30,
      ['9', '8', '7', '6'],
      [true, false, false, false],
      [
        new PlayerReport('Alice', '9', true, 10, 100),
        new PlayerReport('Bob', '8', false, 15, 50),
        new PlayerReport('Charlie', '7', false, 20, 50),
        new PlayerReport('Dave', '6', false, 25, 50),
      ]
    ),
    new QuestionReport(
      'What is the largest planet in our solar system?',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Quiz',
      30,
      ['Jupiter', 'Earth', 'Mars', 'Venus'],
      [true, false, false, false],
      [
        new PlayerReport('Alice', 'Jupiter', true, 10, 100),
        new PlayerReport('Bob', 'Earth', false, 15, 50),
        new PlayerReport('Charlie', 'Mars', false, 20, 50),
        new PlayerReport('Dave', 'Venus', false, 25, 50),
      ]
    ),
    new QuestionReport(
      'What is the chemical symbol for the element oxygen?',
      'https://images.unsplash.com/photo-1700686426826-913b0509c4bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Quiz',
      30,
      ['O', 'Ox', 'Og', 'Om'],
      [true, false, false, false],
      [
        new PlayerReport('Alice', 'O', true, 10, 100),
        new PlayerReport('Bob', 'Ox', false, 15, 50),
        new PlayerReport('Charlie', 'Og', false, 20, 50),
        new PlayerReport('Dave', 'Om', false, 25, 50),
      ]
    ),
  ];

  displayedData: QuestionReport[] = this.mockData;
  searchQuestionTitle: string = "";
  isExpandedView = true;
  isNotExpandedView = () => !this.isExpandedView;

constructor(public dialog: MatDialog) { }

  handleViewChange(event: MatTabChangeEvent) {
    this.isExpandedView = event.index === 0;
  }

  handleTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.displayedData = this.mockData;
    } else if (event.index === 1) {
      this.displayedData = this.mockData.filter(data => data.correctPercentage <= 30);
    }
    if (this.searchQuestionTitle !== '') {
      this.performSearch();
    }
  }

  performSearch() {
    const filterValue = this.searchQuestionTitle.trim().toLowerCase();
    this.displayedData = this.mockData.filter(data => data.title.toLowerCase().includes(filterValue));
  }

  clearSearch() {
    this.searchQuestionTitle = '';
    this.performSearch();
  }

  openDialog(questionReport: QuestionReport) {
    this.dialog.open(QuestionReportDetailDialogComponent, {
      data: questionReport
    });
  }
}
