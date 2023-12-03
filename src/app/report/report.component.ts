import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent {
  @ViewChild(MatSort) sort!: MatSort;

  searchValue = '';

  // Mock data
  gameNames = [
    'Math Challenge',
    'History Quiz',
    'Science Trivia',
    'Geography Test',
    'Literature Game',
    'Music Quiz',
    'Sports Trivia',
    'Movie Challenge',
    'General Knowledge',
    'Art Quiz',
  ];

  getRandomName = () =>
    this.gameNames[Math.floor(Math.random() * this.gameNames.length)];
  getRandomDate = () => {
    const start = new Date(2022, 0, 1);
    const end = new Date(2023, 11, 31);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };
  getRandomPlayers = () => Math.floor(Math.random() * 10) + 1;
  data = Array.from({ length: 20 }, () => ({
    name: this.getRandomName(),
    date: this.getRandomDate().toLocaleString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
    players: this.getRandomPlayers(),
  }));

  // Table data
  dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['name', 'date', 'players', 'action'];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openReport(element: any) {
    this.router.navigate(['home/report-detail', 5]);
  }

  rename(element: any) {
    // Code to rename the report
  }

  moveToTrash(element: any) {
    // Code to move the report to trash
  }
}
