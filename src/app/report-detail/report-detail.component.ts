import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportSummaryDTO } from 'src/DTO/report.summary.dto';
import ApiResponse from 'src/models/api.response';
import { ReportService } from 'src/service/report.service';
import { formatDateTime } from 'src/util';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
})
export class ReportDetailComponent {
  constructor(private route: ActivatedRoute) {}

  gameId: number = 0;
  reportSummary$!: Observable<ApiResponse<ReportSummaryDTO>>;

  formatDateTime = formatDateTime;

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id')) ?? 0;

    if (this.gameId === null) {
      console.error('No id in the URL');
      return;
    }

    this.reportSummary$ = ReportService.getReportSummary(this.gameId).pipe(
      startWith({ success: false, message: '', data: null })
    );
  }
}
