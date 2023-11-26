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
import AppColor from 'src/core/color';
import Kapo from 'src/models/kapo';
import TrueOrFalseQuiz from 'src/models/true.or.false.quiz';
import { AnswerService } from './answer.service';
import Quiz from 'src/models/quiz';

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
  answerBool: boolean = false;

  @Output() onAnswerValueChange = new EventEmitter<string>();
  @Output() onAnswerCorrectnessToggle = new EventEmitter<boolean>();

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

  ngOnInit() {
    this.initializeAnswerPlaceholder();
    this.initializeBackgroundColor();
    let initValue = (this.kapo as Quiz).answers[this.index];
    if (initValue != '' && initValue != null) {
      this.answer = initValue;
      this.emptyContent = false;
    }
    else {
      this.answer = '';
      this.emptyContent = true;
    }
    this.isChecked = (this.kapo as Quiz).correctAnswers[this.index];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['kapo'] && !changes['kapo'].firstChange) {
      this.ngOnInit();
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

  onChangeTextarea(event: any) {
    this.preventEnter(event);
    this.adjustTextareaHeight(event);
    this.remainingCharacters = 95 - this.answer.length;
    this.emptyContent = this.answer.length === 0;
    if (this.answer.length == 0) {
      this.isChecked = false;
    }
    this.onAnswerValueChange.emit(this.answer);
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
    this.isChecked = !this.isChecked;
    this.onAnswerCorrectnessToggle.emit(this.isChecked);
  }
}
