import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDTO } from 'src/DTO/report.dto';
import ApiResponse from 'src/models/api.response';
import { KapoReport } from 'src/models/report';
import { ReportService } from 'src/service/report.service';
import { formatDateTime } from 'src/util';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  searchValue = '';

  // Table data
  data: ReportDTO[] = [];
  dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['name', 'date', 'players', 'action'];

  formatDateTime = formatDateTime;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    ReportService.getAllReports().subscribe((response: ApiResponse<ReportDTO[]>) => {
      if (response.success) {
        this.data = response.data ? response.data : [];
        this.dataSource = new MatTableDataSource(this.data);
      } else {
        console.error(response.message);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.getAllReports();
  }

  openReport(element: any) {
    this.router.navigate(['home/report-detail', element.id]);
  }

  rename(element: any) {
    // Code to rename the report
  }

  moveToTrash(element: any) {
    // Code to move the report to trash
  }
}