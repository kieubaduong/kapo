import { Component } from '@angular/core';
import Kapo from 'src/models/kapo';
import Quiz from 'src/models/quiz';
import Template from 'src/models/template';
import TrueOrFalseQuiz from 'src/models/true.or.false.quiz';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  mockKapoes: Kapo[] = [];
  mockTemplate: Template = new Template(
    'World Capitals Quiz',
    'world_capitals_image.jpg',
    10,
    'Quiz Master',
    5
  );

  constructor() {
    for (let i = 0; i < 5; i++) {
      const quiz = new Quiz();
      quiz.title = `What is the capital of country ${i + 1}?`;
      quiz.timeLimit = 10;
      quiz.points = 'standard';
      quiz.answerOptions = 'single-select';
      quiz.answers = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
      quiz.correctAnswers = [true, false, false, false];
      this.mockKapoes.push(quiz);

      const trueOrFalseQuiz = new TrueOrFalseQuiz();
      trueOrFalseQuiz.title = `True or False: The capital of country ${
        i + 1
      } is Option 1.`;
      trueOrFalseQuiz.timeLimit = 10;
      trueOrFalseQuiz.points = 'standard';
      trueOrFalseQuiz.answer = true;
      this.mockKapoes.push(trueOrFalseQuiz);
    }

    this.mockTemplate.setKapoes(this.mockKapoes);
  }
}
