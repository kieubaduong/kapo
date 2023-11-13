// custom-tooltip.component.ts
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-points-tooltip',
  templateUrl: './points-tooltip.component.html',
  styleUrls: ['./points-tooltip.component.css']
})
export class PointsTooltipComponent {
  @Input() overlayOrigin!: CdkOverlayOrigin;
  isHovering = false;

  showTooltip(): void {
    this.isHovering = true;
  }

  hideTooltip(): void {
    this.isHovering = false;
  }
}