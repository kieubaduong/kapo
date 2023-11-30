import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import KapoFactory from '../../models/kapo.factory';
import Kapo from '../../models/kapo';
import Quiz from '../../models/quiz';
import Slide from '../../models/slide';
import TrueOrFalseQuiz from '../../models/true.or.false.quiz';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from '../common/add-question-dialog/add.question.dialog.component';
import {
  isInstanceOfQuiz,
  isInstanceOfSlide,
  isInstanceOfTrueFalseQuiz,
} from 'src/util';
import { QuizValidationErrorDialogComponent } from '../common/quiz-validation-error-dialog/quiz-validation-error-dialog.component';
import KapoError from 'src/models/kapo.error';
import Checkable from 'src/models/checkable';
import { FinalizeKapoDialogComponent } from '../common/finalize-kapo-dialog/finalize-kapo-dialog.component';
import { DeleteKapoDialogComponent } from '../common/delete-kapo-dialog/delete-kapo-dialog.component';

@Directive({ selector: '[appScrollable]' })
export class ScrollableDirective {
  constructor(private _el: ElementRef) {}
  set scrollTop(value: number) {
    this._el.nativeElement.scrollTop = value;
  }
}

@Directive({ selector: '[appOffsetTop]' })
export class OffsetTopDirective {
  constructor(private _el: ElementRef) {}
  get offsetTop(): number {
    return this._el.nativeElement.offsetTop;
  }
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  isInstanceOfQuiz = isInstanceOfQuiz;
  isInstanceOfSlide = isInstanceOfSlide;
  isInstanceOfTrueFalseQuiz = isInstanceOfTrueFalseQuiz;

  @ViewChild('userInputTextarea') userInputTextarea!: ElementRef;
  @ViewChildren(OffsetTopDirective) listItems!: QueryList<OffsetTopDirective>;
  @ViewChild(ScrollableDirective) list!: ScrollableDirective;

  // UI related variables
  sidebarOpen = true;
  sidebarAnimating = false;
  greyContainerHeight: string = '52px';
  placeholder = 'Enter your question here...';
  displayCounter = false;
  remainingCharacters: number = 95;
  isTextareaFocused: boolean = false;

  // Data related variables
  kapoItems: Kapo[] = [];
  selectedKapo: Kapo;
  kapoFactory = new KapoFactory();
  questionType = 'quiz';
  remainingCharacter = 120;
  initialWindowWidth: number = window.innerWidth;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private validationErrorDialog: MatDialog
  ) {
    this.kapoItems = [
      this.kapoFactory.createQuestion('TrueOrFalse'),
      // this.kapoFactory.createQuestion('Quiz'),
      // this.kapoFactory.createQuestion('TrueOrFalse'),
      // this.kapoFactory.createQuestion('Quiz'),
    ];

    this.selectedKapo = this.kapoItems[0];
  }

  onTitleChange(event: any) {
    this.selectedKapo.title = event.target.value;
    this.adjustTextareaHeight(event);
    this.updateCountdown();
  }

  handleAnswerChange(newValue: boolean) {
    (this.selectedKapo as TrueOrFalseQuiz).answer = newValue;
    this.cdr.detectChanges();
  }

  selectQuiz(index: number) {
    this.selectedKapo = this.kapoItems[index];
    this.remainingCharacter = 120 - this.selectedKapo.title.length;
    this.blurOnQuestion();
    console.log(this.selectedKapo);
    this.cdr.detectChanges();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
  
    if (files && files.length > 0) {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.selectedKapo.media = reader.result;
        }
      };
  
      reader.readAsDataURL(files[0]);
    }
  }

  duplicateKapo(item: Kapo, index: number, event: Event) {
    event.stopPropagation();

    const duplicatedKapo = item.clone();
    this.kapoItems.splice(index + 1, 0, duplicatedKapo as Kapo);
    this.updateItemId();
    this.selectQuiz(index + 1);
    this.cdr.detectChanges();
  }

  deleteKapo(index: number) {
    let typeQuestion: string = "";
    if (isInstanceOfQuiz(this.kapoItems[index])) {
      typeQuestion = 'quiz';
    }
    if (isInstanceOfTrueFalseQuiz(this.kapoItems[index])) {
      typeQuestion = 'true or false';
    }
    const dialogRef = this.dialog.open(DeleteKapoDialogComponent, {
      data: typeQuestion,
      disableClose: true,
    });

    if (this.kapoItems.length === 1) {
      return;
    }
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kapoItems.splice(index, 1);
        this.updateItemId();
        if (index === 0) {
          this.selectQuiz(0);
        } else {
          this.selectQuiz(index - 1);
        }
      }
    });
  }

  deleteImage() {
    this.selectedKapo.media = '';
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

  updateItemId() {
    this.kapoItems.forEach((item, index) => {
      item.id = index;
    });
  }

  // UI related functions
  openValidationErrorDialog() {
    const kapoErrors = this.kapoItems.flatMap((kapo) => {
      if (isInstanceOfQuiz(kapo)) {
        return (kapo as Quiz).validate();
      }
      if (isInstanceOfTrueFalseQuiz(kapo)) {
        return (kapo as TrueOrFalseQuiz).validate();
      }
      return [];
    });

    const errors = kapoErrors.filter(
      (kapoError) => kapoError.errors.length > 0
    ).length;

    if (errors === 0) {
      this.dialog.open(FinalizeKapoDialogComponent, {
        disableClose: true,
      });
    } else {
      this.validationErrorDialog.open(QuizValidationErrorDialogComponent, {
        data: { kapoErrors },
        disableClose: true,
      });
    }
  }

  openAddQuestionDialog() {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.kapoItems.push(this.kapoFactory.createQuestion(result));
      this.scrollToBottom();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < this.initialWindowWidth * 0.75) {
      this.sidebarOpen = false;
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.list.scrollTop = this.listItems.last.offsetTop;
    }, 0);
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

  updateCountdown() {
    this.remainingCharacter = 120 - this.selectedKapo.title.length;
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
    if (this.selectedKapo.title.length === 0) {
      this.placeholder = 'Enter your question here...';
    }
  }

  onFocus() {
    const range = document.createRange();
    const sel = window.getSelection();
    if (sel) {
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  updateTextareaHeightAndRemainingChars(event: any) {
    this.userInputTextarea.nativeElement.style.height = '40px';
    if (
      this.userInputTextarea.nativeElement.scrollHeight >
      this.userInputTextarea.nativeElement.clientHeight
    ) {
      this.userInputTextarea.nativeElement.style.height =
        this.userInputTextarea.nativeElement.scrollHeight + 'px';
    }
    this.remainingCharacters =
      95 - this.userInputTextarea.nativeElement.value.length;
  }

  onTextareaFocus() {
    this.isTextareaFocused = true;
  }

  onTextareaBlur() {
    this.isTextareaFocused = false;
  }
}
