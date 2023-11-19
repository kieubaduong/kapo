import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('userInputTextarea') userInputTextarea!: ElementRef;

  // UI related variables
  sidebarOpen = true;
  sidebarAnimating = false;
  greyContainerHeight: string = '52px';
  placeholder = 'Enter your question here...';
  displayCounter = false;
  remainingCharacters: number = 95;
  isTextareaFocused: boolean = false;
  answerPlaceholder: string = 'Add answer...';

  // Data related variables
  kapoItems: Kapo[] = [];
  selectedKapo: Kapo;
  kapoFactory = new KapoFactory();
  questionType = 'quiz';
  remainingCharacter = 120;
  questionText = '';
  initialWindowWidth: number = window.innerWidth;

  constructor(private cdr: ChangeDetectorRef) {
    this.kapoItems = [
      this.kapoFactory.createQuestion('Quiz'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('TrueOrFalse'),
      this.kapoFactory.createQuestion('Quiz'),
    ];

    this.selectedKapo = this.kapoItems[0];
  }

  ngAfterViewInit() {
    this.myDiv.nativeElement.addEventListener('focus', this.onFocus.bind(this));
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

  handleAnswerChange(newValue: boolean) {
    (this.selectedKapo as TrueOrFalseQuiz).answer = newValue;
    this.cdr.detectChanges();
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
    console.log(this.selectedKapo);
    this.cdr.detectChanges();
  }

  updateCountdown() {
    this.remainingCharacter = 120 - this.questionText.length;
  }

  adjustTextareaHeight(event: any): void {
    event.target.style.height = '52px';
    this.greyContainerHeight = '57px';
    if (event.target.scrollHeight > event.target.clientHeight) {
      let temp = event.target.scrollHeight + 5;
      this.greyContainerHeight = temp + 'px';
      temp += 48;
      event.target.style.height = event.target.scrollHeight + 'px';
    } else if (
      event.target.scrollHeight < parseInt(event.target.style.height)
    ) {
      event.target.style.height = event.target.scrollHeight + 'px';
      this.greyContainerHeight = event.target.scrollHeight + 5 + 'px';
    }
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

  onFocus() {
    const range = document.createRange();
    const sel = window.getSelection();
    if (sel) {
      range.setStart(this.myDiv.nativeElement.firstChild, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  onKeyup() {
    if (!this.myDiv.nativeElement.textContent) {
      this.myDiv.nativeElement.innerHTML = '&#8203;';
      this.onFocus();
    }
  }

  updateTextareaHeightAndRemainingChars(event: any) {
    this.userInputTextarea.nativeElement.style.height = '40px';
    if (this.userInputTextarea.nativeElement.scrollHeight > this.userInputTextarea.nativeElement.clientHeight) {
      this.userInputTextarea.nativeElement.style.height = this.userInputTextarea.nativeElement.scrollHeight + 'px';
    }
    this.remainingCharacters = 95 - this.userInputTextarea.nativeElement.value.length;
  }

  onTextareaFocus() {
    this.isTextareaFocused = true;
    this.answerPlaceholder = '';
  }

  onTextareaBlur() {
    if (!this.userInputTextarea.nativeElement.value) {
      this.answerPlaceholder = 'Add answer...';
    }
    this.isTextareaFocused = false;
  }

  trackByFn(index: number, kapo: Kapo): number {
    return kapo.id;
  }

}
