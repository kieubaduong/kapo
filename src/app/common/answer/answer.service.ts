import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private answerSource = new BehaviorSubject<boolean>(false);
  currentAnswer = this.answerSource.asObservable();

  constructor() { }

  setAnswer(isTrue: boolean) {
    this.answerSource.next(isTrue);
  }
}