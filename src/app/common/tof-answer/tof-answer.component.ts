import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import AppColor from 'src/app/color';
import Kapo from 'src/data/models/kapo';
import TrueOrFalseQuiz from 'src/data/models/true.or.false.quiz';
import { AnswerService } from '../answer/answer.service';

export enum AnswerType {
  TrueAnswer,
  FalseAnswer,
}

@Component({
  selector: 'app-tof-answer',
  templateUrl: './tof-answer.component.html',
  styleUrls: ['./tof-answer.component.css'],
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
export class TofAnswerComponent implements OnInit {
  @Input() trueOrFalse: boolean = true;
  @Input() kapo!: Kapo;

  @Output() onAnswerChange = new EventEmitter<boolean>();

  answerType: AnswerType = AnswerType.TrueAnswer;
  showCheckIcon: boolean = false;
  isChecked: boolean = false;
  backgroundColor: string = AppColor.red;
  backgroundColorDark: string = AppColor.redDark;
  answer: string = '';
  selectedAnswer: boolean = false;

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.setAnswerType();
    this.subscribeToAnswerService();
    this.setSelectedAnswer();
    this.checkAnswer();
    this.setAnswerText();
    this.initializeBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['kapo'] && !changes['kapo'].firstChange) {
      this.ngOnInit();
    }
  }

  setAnswerType() {
    this.answerType = this.trueOrFalse ? AnswerType.TrueAnswer : AnswerType.FalseAnswer;
  }
  
  subscribeToAnswerService() {
    this.answerService.currentAnswer.subscribe((isTrue) => {
      this.isChecked = this.isTrueAnswer() ? isTrue : !isTrue;
    });
  }
  
  setSelectedAnswer() {
    this.selectedAnswer = (this.kapo as TrueOrFalseQuiz).answer;
  }

  initializeBackgroundColor() {
    const colors = [
      { bg: AppColor.red, darkBg: AppColor.redDark },
      { bg: AppColor.blue, darkBg: AppColor.blueDark },
    ];
    let color;
    this.isTrueAnswer() ? (color = colors[0]) : (color = colors[1]);
    this.backgroundColor = color!.bg;
    this.backgroundColorDark = color!.darkBg;
  }

  setAnswerText() {
    this.answer = this.isTrueAnswer() ? 'True' : 'False';
  }

  checkAnswer() {
    const isTrueAnswerSelected =
      this.selectedAnswer === true && this.isTrueAnswer();
    const isFalseAnswerSelected =
      this.selectedAnswer === false && this.isFalseAnswer();

    if (isTrueAnswerSelected || isFalseAnswerSelected) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  toggleButton() {
    if (this.isChecked) {
      return;
    }
    if (this.isTrueAnswer()) {
      this.answerService.setAnswer(true);
      this.onAnswerChange.emit(true);
    }
    if (this.isFalseAnswer()) {
      this.answerService.setAnswer(false);
      this.onAnswerChange.emit(false);
    }
    this.isChecked = true;
  }

  isTrueAnswer(): boolean {
    return this.answerType === AnswerType.TrueAnswer;
  }

  isFalseAnswer(): boolean {
    return this.answerType === AnswerType.FalseAnswer;
  }
}
