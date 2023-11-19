import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import AppColor from 'src/app/color';
import Kapo from 'src/data/models/kapo';
import TrueOrFalseQuiz from 'src/data/models/true.or.false.quiz';
import { AnswerService } from './answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('changeBgColor', [
      state(
        'unchecked',
        style({
          backgroundColor: 'transparent',
        })
      ),
      state(
        'checked',
        style({
          backgroundColor: '#66bf39',
        })
      ),
      transition('unchecked <=> checked', animate('150ms')),
    ]),
  ],
})
export class AnswerComponent implements OnInit {
  @Input() index: number = -1;
  @Input() kapo!: Kapo;
  isTrueOrFalseQuiz: boolean = false;
  answerBool: boolean = false;

  @Output() onAnswerChange = new EventEmitter<boolean>();

  @ViewChild('userInputTextarea') userInputTextarea!: ElementRef;
  remainingCharacters: number = 95;
  answerPlaceholder: string = 'Add answer ' + this.index.toString();
  isTextareaFocused: boolean = false;
  emptyContent: boolean = true;
  showCheckIcon: boolean = false;
  isChecked: boolean = false;
  backgroundColor: string = AppColor.red;
  backgroundColorDark: string = AppColor.redDark;
  answer: string = '';
  isTextareaDisabled: boolean = false;

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.isTrueOrFalseQuiz = this.kapo instanceof TrueOrFalseQuiz;

    if (this.kapo instanceof TrueOrFalseQuiz) {
      this.answerService.currentAnswer.subscribe((isTrue) => {
        this.isChecked = this.index === 0 ? isTrue : !isTrue;
      });
      this.isChecked = this.index === 0 ? this.kapo.answer : !this.kapo.answer;
      this.initializeAnswerBool();
      this.initializeTextarea();
    }

    this.initializeAnswerPlaceholder();
    this.initializeBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['kapo'] && !changes['kapo'].firstChange) {
      if (this.isTrueOrFalseQuiz) {
        this.isChecked =
          this.index === 0
            ? (this.kapo as TrueOrFalseQuiz).answer
            : !(this.kapo as TrueOrFalseQuiz).answer;
      }
    }
  }

  initializeAnswerPlaceholder() {
    this.answerPlaceholder = 'Add answer ' + (this.index + 1).toString();
  }

  initializeBackgroundColor() {
    const colors = [
      { bg: AppColor.red, darkBg: AppColor.redDark },
      { bg: AppColor.blue, darkBg: AppColor.blueDark },
      { bg: AppColor.yellow, darkBg: AppColor.yellowDark },
      { bg: AppColor.green, darkBg: AppColor.greenDark },
      { bg: AppColor.purple, darkBg: AppColor.purpleDark },
      { bg: AppColor.orange, darkBg: AppColor.orangeDark },
    ];
    const color = colors[this.index] || colors[0];
    this.backgroundColor = color.bg;
    this.backgroundColorDark = color.darkBg;
  }

  initializeTextarea() {
    this.isTextareaDisabled = true;
    this.emptyContent = false;
    this.answer = this.index === 0 ? 'True' : 'False';
  }

  initializeAnswerBool() {
    if ((this.kapo as TrueOrFalseQuiz).answer === true) {
      if (this.index === 0) {
        this.isChecked = true;
      }
    } else {
      if (this.index === 1) {
        this.isChecked = true;
      }
    }
  }

  onChangeTextarea(event: any) {
    this.preventEnter(event);
    this.adjustTextareaHeight(event);
    this.remainingCharacters = 95 - this.answer.length;
    this.emptyContent = this.answer.length === 0;
    if (this.answer.length == 0) {
      this.isChecked = false;
    }
  }

  preventEnter(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  adjustTextareaHeight(event: any) {
    console.log(this.userInputTextarea.nativeElement.value.length);
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
    this.emptyContent = this.userInputTextarea.nativeElement.value.length === 0;
  }

  onTextareaFocus() {
    this.answerPlaceholder = '';
    this.isTextareaFocused = true;
  }

  onTextareaBlur() {
    if (!this.userInputTextarea.nativeElement.value) {
      this.answerPlaceholder = 'Add answer ' + (this.index + 1).toString();
    }
    this.isTextareaFocused = false;
  }

  toggleButton() {
    if (this.isTrueOrFalseQuiz && !this.isChecked) {
      this.answerService.setAnswer(this.index === 0);
      this.isChecked = true;
      this.onAnswerChange.emit(this.index === 0);
    } else if (!this.isTrueOrFalseQuiz) {
      this.isChecked = !this.isChecked;
    }
  }
}
