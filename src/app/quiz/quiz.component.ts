import { Component, HostListener } from '@angular/core';
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
  // UI related variables
  sidebarOpen = true;
  sidebarAnimating = false;
  greyContainerHeight: string = '52px';
  placeholder = 'Enter your question here...';
  displayCounter = false;
  firstRowHeight: string = '100px';

  // Data related variables
  kapoItems: Kapo[] = [];
  selectedKapo: Kapo;
  kapoFactory = new KapoFactory();
  questionType = 'quiz';
  remainingCharacter = 120;
  questionText = '';
  initialWindowWidth: number = window.innerWidth;

  constructor() {
    this.kapoItems = [
      this.kapoFactory.createQuestion('Quiz'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('Quiz'),
    ];

    this.selectedKapo = this.kapoItems[0];
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

  // Check if the item is an instance of a specific class
  isInstanceOfQuiz(item: any): boolean {
    return item instanceof Quiz;
  }

  isInstanceOfSlide(item: any): boolean {
    return item instanceof Slide;
  }

  isInstanceOfTrueFalseQuiz(item: any): boolean {
    return item instanceof TrueOrFalseQuiz;
  }

  // UI related functions
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < this.initialWindowWidth * 0.75) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarAnimating = true;

    setTimeout(() => {
      this.sidebarAnimating = false;
      this.adjustTextareaHeight({
        target: document.getElementById('question'),
      });
    }, 200);
  }

  selectQuiz(index: number) {
    this.selectedKapo = this.kapoItems[index];
  }

  updateCountdown() {
    this.remainingCharacter = 120 - this.questionText.length;
  }

  adjustTextareaHeight(event: any): void {
    event.target.style.height = '52px';
    this.greyContainerHeight = '57px';
    this.firstRowHeight = '100px';
    if (event.target.scrollHeight > event.target.clientHeight) {
      let temp = event.target.scrollHeight + 5;
      this.greyContainerHeight = temp + 'px';
      temp += 48;
      this.firstRowHeight = temp + 'px';
      event.target.style.height = event.target.scrollHeight + 'px';
    } else if (
      event.target.scrollHeight < parseInt(event.target.style.height)
    ) {
      event.target.style.height = event.target.scrollHeight + 'px';
      this.greyContainerHeight = event.target.scrollHeight + 5 + 'px';
      this.firstRowHeight = event.target.scrollHeight + 53 + 'px';
    }
    console.log(this.firstRowHeight);
  }

  preventEnter(event: any): void {
    event.preventDefault();
  }

  blurOnQuestion(): void {
    this.displayCounter = false;
    if (this.questionText.length === 0) {
      this.placeholder = 'Enter your question here...';
    }
  }
}
