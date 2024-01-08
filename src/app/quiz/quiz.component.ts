import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
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
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import SettingData from 'src/models/setting.data';
import { TemplateService } from 'src/service/template.service';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  @ViewChild('kapoList') kapoList!: ElementRef;

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
  selectedKapo!: Kapo;
  kapoFactory = new KapoFactory();
  questionType = 'quiz';
  remainingCharacter = 120;
  initialWindowWidth: number = window.innerWidth;
  settingData: SettingData = new SettingData();

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private validationErrorDialog: MatDialog,
    private notificationService: NotificationService,
    public router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const templateId = parseInt(params['templateId']);
      
      if (templateId === -1) {
        this.kapoItems = [
          this.kapoFactory.createQuestion('TrueOrFalse'),
        ];
  
        this.selectedKapo = this.kapoItems[0];
        return;
      }
  
      this.settingData.templateId = templateId;
      console.log(templateId, "templateId");
      TemplateService.getQuestionsByTemplateId(
        templateId.toString()
      ).subscribe(
        (response) => {
          if (response.success) {
            console.log(response, "response");
            if (response.data === null || response.data === undefined || response.data.length === 0) {
              this.kapoItems.push(new Quiz());
            }
            const questions = response.data ?? [];
            for (let i = 0; i < questions.length; i++) {
              switch (questions[i].type) {
                case 'multiple_choice':
                  this.kapoItems.push(Quiz.fromQuestionDTO(questions[i]));
                  break;
                case 'true_false':
                  this.kapoItems.push(
                    TrueOrFalseQuiz.fromQuestionDTO(questions[i])
                  );
                  break;
              }
            }
            console.log("??????????????????????");
            console.log(this.kapoItems, "kapoItems");
            this.selectedKapo = this.kapoItems[0];
          } else {
            this.notificationService.showError(
              'Error occurred while fetching questions'
            );
          }
        }
      );
    });
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

  selectQuiz(index: number, scroll: boolean = false) {
    this.selectedKapo = this.kapoItems[index];
    this.questionType =
      this.selectedKapo.constructor.name === 'Quiz' ? 'quiz' : 'true-or-false';
    this.remainingCharacter = 120 - this.selectedKapo.title.length;
    this.blurOnQuestion();
    console.log(this.selectedKapo);

    // Scroll to the selected kapo
    if (scroll && this.kapoList && this.kapoList.nativeElement) {
      const matListElement =
        this.kapoList.nativeElement.querySelector('mat-list');
      if (matListElement) {
        const kapoElements = matListElement.children;
        const selectedElement = kapoElements[index];
        if (selectedElement) {
          setTimeout(() => {
            matListElement.scrollTop =
              selectedElement.offsetTop - selectedElement.clientHeight;
          }, 0);
        }
      }
    }
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
    let typeQuestion: string = '';
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

    dialogRef.afterClosed().subscribe((result) => {
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
  openSettingDialog(): void {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      data: { ...this.settingData },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed');
      this.settingData = result;
    });
  }

  openValidationErrorDialog() {
    const kapoErrors = this.kapoItems.flatMap((kapo) => {
      let kapoError: KapoError = new KapoError('', '', []);
      if (isInstanceOfQuiz(kapo)) {
        kapoError = (kapo as Quiz).validate();
      }
      if (isInstanceOfTrueFalseQuiz(kapo)) {
        kapoError = (kapo as TrueOrFalseQuiz).validate();
      }
      if (kapoError.errors.length === 0) {
        return [];
      }
      return [kapoError];
    });

    const errors = kapoErrors.filter(
      (kapoError) => kapoError.errors.length > 0
    ).length;

    if (errors === 0) {
      if (this.settingData.templateId === -1) {
        const dialogRef = this.dialog.open(FinalizeKapoDialogComponent, {
          disableClose: true,
          data: this.settingData,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result === null || result === undefined) {
            return;
          }
          this.settingData = result;

          TemplateService.createTemplate(this.settingData).subscribe(
            (response) => {
              if (response.success) {
                this.settingData.templateId = response.data?.id ?? 0;
                const questionDTOs = this.kapoItems.map((kapo) =>
                  kapo.toQuestionDTO()
                );
                for (let i = 0; i < questionDTOs.length; i++) {
                  questionDTOs[i].limitTime = parseInt(
                    questionDTOs[i].limitTime.toString()
                  );
                }
                TemplateService.patchTemplate(
                  this.settingData.templateId.toString(),
                  questionDTOs
                ).subscribe((response) => {
                  if (response === 'Could not patch template') {
                    this.notificationService.showError(
                      'Error occurred while updating template'
                    );
                    return;
                  }
                  this.notificationService.showSuccess(
                    'Template updated successfully'
                  );
                });
              } else {
                this.notificationService.showError(
                  'Error occurred while saving template'
                );
              }
            }
          );
        });

        return;
      }

      const questionDTOs = this.kapoItems.map((kapo) => kapo.toQuestionDTO());
      for (let i = 0; i < questionDTOs.length; i++) {
        questionDTOs[i].limitTime = parseInt(
          questionDTOs[i].limitTime.toString()
        );
      }
      console.log(questionDTOs, 'questionDTOs');
      TemplateService.patchTemplate(
        this.settingData.templateId.toString(),
        questionDTOs
      ).subscribe((response) => {
        if (response === 'Could not patch template') {
          this.notificationService.showError(
            'Error occurred while updating template'
          );
          return;
        }
        this.notificationService.showSuccess('Template updated successfully');
      });
    } else {
      let dialogRef = this.validationErrorDialog.open(
        QuizValidationErrorDialogComponent,
        {
          data: { kapoErrors },
          disableClose: true,
        }
      );

      dialogRef.afterClosed().subscribe((index) => {
        if (index == -1) {
          return;
        }
        this.selectQuiz(index, true);
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

  exit() {
    this.location.back();
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

  parseToInt(value: string): number {
    return parseInt(value);
  }
}
