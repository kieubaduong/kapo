import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-structure-preview',
  templateUrl: './slide-structure-preview.component.html',
  styleUrls: ['./slide-structure-preview.component.css'],
})
export class SlideStructurePreviewComponent {
  @Input() title: string | null = null;
  @Input() selected!: boolean;
  @Input() imgUrl: string | null = null;
  @Input() content: string | null = null;
}
