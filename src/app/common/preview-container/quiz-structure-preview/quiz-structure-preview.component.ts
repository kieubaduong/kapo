import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-structure-preview',
  templateUrl: './quiz-structure-preview.component.html',
  styleUrls: ['./quiz-structure-preview.component.css']
})
export class QuizStructurePreviewComponent {
  @Input() title: string | null = null;
  @Input() timeLimit!: number;
  @Input() imgUrl: string | null = null;
  @Input() selected: boolean = false;
}
