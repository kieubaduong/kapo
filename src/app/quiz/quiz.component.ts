import { Component, HostListener, ViewChild } from '@angular/core';
import { PointsTooltipComponent } from '../common/custom-tooltip/points-tooltip.component';
import KapoFactory from '../../data/models/kapo.factory';
import Kapo from '../../data/models/kapo';
import Quiz from '../../data/models/quiz';
import Slide from '../../data/models/slide';
import TrueOrFalseQuiz from '../../data/models/true.or.false.quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  isSidebarOpen = true;
  isSidebarAnimating = false;
  items: Kapo[] = [];
  kapoFactory = new KapoFactory();
  selectedKapo: Kapo;
  questionType = 'quiz';
  countdown = 120;
  question = '';

  constructor() {
    this.items = [
      this.kapoFactory.createQuestion('Quiz'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('Quiz'),
    ];

    this.selectedKapo = this.items[0];
  }

  

  selectQuiz(index: number) {
    this.selectedKapo = this.items[index];
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarAnimating = true;

    setTimeout(() => {
      this.isSidebarAnimating = false;
    }, 200);
  }

  isInstanceOfQuiz(item: any): boolean {
    return item instanceof Quiz;
  }

  isInstanceOfSlide(item: any): boolean {
    return item instanceof Slide;
  }

  isInstanceOfTrueFalseQuiz(item: any): boolean {
    return item instanceof TrueOrFalseQuiz;
  }

  getTypeName(item: any): string {
    switch (item.constructor.name) {
      case 'Quiz':
        return 'Quiz';
      case 'Slide':
        return 'Slide';
      case 'TrueOrFalseQuiz':
        return 'True or false';
      default:
        break;
    }
    return 'Invalid type';
  }

  updateCountdown() {
    this.countdown = 120 - this.question.length;
  }
}
