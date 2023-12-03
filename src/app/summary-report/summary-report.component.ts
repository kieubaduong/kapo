import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent {
  @ViewChild('progress') progress!: ElementRef;

  percent = 25;
  difficultAnswerCorrectPercent: number = 25; // replace 25 with your actual value

  ngOnInit() {
    this.setProgress(this.difficultAnswerCorrectPercent);
  }

  ngAfterViewInit() {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (this.percent / 100 * circumference);
    this.progress.nativeElement.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }

  setProgress(percent: number) {
    const offset = this.progress.nativeElement.style.strokeDasharray.baseVal[0] - percent / 100 * this.progress.nativeElement.style.strokeDasharray.baseVal[0];
    this.progress.nativeElement.style.strokeDashoffset = offset;
  }
}
