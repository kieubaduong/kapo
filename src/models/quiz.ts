import { QuestionDTO } from 'src/DTO/question.dto';
import Checkable from './checkable';
import Cloneable from './cloneable';
import Kapo from './kapo';
import KapoError from './kapo.error';

class Quiz extends Kapo implements Checkable {
  questionType: string = 'Quiz';
  minTimeLimit: number = 5;
  timeLimit: number = this.minTimeLimit;
  points: string = 'standard';
  answerOptions: string = 'single-select';
  answers: string[] = new Array(4).fill(null);
  correctAnswers: boolean[] = new Array(4).fill(false);

  constructor() {
    super();
  }

  validate(): KapoError {
    let errors: string[] = [];

    if (this.title.trim().length === 0) {
      errors.push('Question missing');
    }

    let answerMissing = 0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] === null || this.answers[i].trim().length === 0) {
        answerMissing++;
      }
    }
    if (answerMissing > 0) {
      errors.push(`${answerMissing} answers missing`);
    }

    const selectedCorrectAnswers = this.correctAnswers.filter(
      (answer) => answer === true
    );
    if (selectedCorrectAnswers.length === 0) {
      errors.push('Correct answer not selected');
    }

    const name: string = this.id + 1 + ' - ' + this.questionType;
    const question: string = this.title;
    return new KapoError(name, question, errors);
  }

  override getFieldsForUI(): string[] {
    return ['time-limit', 'points', 'answer-options'];
  }

  override clone(): Cloneable {
    const quiz = new Quiz();
    quiz.id = this.id;
    quiz.title = this.title;
    quiz.media = this.media;
    quiz.questionType = this.questionType;
    quiz.timeLimit = this.timeLimit;
    quiz.points = this.points;
    quiz.answerOptions = this.answerOptions;
    quiz.answers = { ...this.answers};
    quiz.correctAnswers = this.correctAnswers;
    return quiz;
  }

  override toQuestionDTO(): QuestionDTO {
    const questionDTO = new QuestionDTO();
    questionDTO.id = this.id;
    questionDTO.content = this.title;
    questionDTO.type = 'multiple_choice';
    questionDTO.limitTime = this.timeLimit;
    switch (this.points) {
      case 'standard':
        questionDTO.points = 100;
        break;
      case 'double-points':
        questionDTO.points = 200;
        break;
      case 'no-points':
        questionDTO.points = 0;
        break;
    }
    questionDTO.choices = [];
    for (let i = 0; i < this.answers.length; i++) {
      const choice = {
        id: i,
        content: this.answers[i],
        isCorrect: this.correctAnswers[i],
      };
      questionDTO.choices.push(choice);
    }
    return questionDTO;
  }

  public static fromQuestionDTO(questionDTO: QuestionDTO): Quiz {
    const quiz = new Quiz();
    quiz.id = questionDTO.id;
    quiz.title = questionDTO.content;
    quiz.media = questionDTO.image;
    quiz.questionType = 'Quiz';
    quiz.timeLimit = questionDTO.limitTime;
    switch (questionDTO.points) {
      case 100:
        quiz.points = 'standard';
        break;
      case 200:
        quiz.points = 'double-points';
        break;
      case 0:
        quiz.points = 'no-points';
        break;
    }
    quiz.answerOptions = 'single-select';
    quiz.answers = new Array(4).fill(null);
    let countCorrectAnswers = 0;
    quiz.correctAnswers = new Array(4).fill(false);
    for (let i = 0; i < questionDTO.choices.length; i++) {
      quiz.answers[i] = questionDTO.choices[i].content;
      quiz.correctAnswers[i] = questionDTO.choices[i].isCorrect;
      if (questionDTO.choices[i].isCorrect) {
        countCorrectAnswers++;
      }
    }
    if (countCorrectAnswers > 1) {
      quiz.answerOptions = 'multi-select';
    }
    return quiz;
  }
}

export default Quiz;
