import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoiceDTO } from 'src/DTO/choice.dto';
import { QuestionDTO } from 'src/DTO/question.dto';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() index!: number;
  @Input() question!: QuestionDTO;
  @Input() isCollapsed = true;

  @Output() toggle = new EventEmitter<boolean>();

  choices: ChoiceDTO[] = [];
  kapoType: String = '';

  ngOnInit() {
    this.index += 1;
    this.choices = this.question.choices;
    switch (this.question.type) {
      case 'true_false':
        this.kapoType = 'True or False';
        break;
      default:
        this.kapoType = 'Quiz';
        break;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }
}
