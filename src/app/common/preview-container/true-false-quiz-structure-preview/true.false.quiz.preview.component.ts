import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-true-false-quiz-preview',
  templateUrl: './true.false.quiz.preview.component.html',
  styleUrls: ['./true.false.quiz.preview.component.css'],
})
export class TrueFalseQuizStructurePreviewComponent {
  @Input() title: string | null = null;
  @Input() selected: boolean = false;
  @Input() imgUrl: string | null = null;
  @Input() timeLimit!: number;
}
