import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PointsTooltipComponent } from '../../custom-tooltip/points-tooltip.component';

@Component({
  selector: 'app-points-component',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {
  @ViewChild('tooltip') tooltip!: PointsTooltipComponent;
  @Input() points = 'standard';
  @Output() pointsChange = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onPointsChange(value: string) {
    this.points = value;
    this.pointsChange.emit(this.points);
}

  showTooltip(): void {
    this.tooltip.isHovering = true;
  }

  hideTooltip(): void {
    this.tooltip.isHovering = false;
  }

}
