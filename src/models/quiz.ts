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
    quiz.answers = this.answers;
    quiz.correctAnswers = this.correctAnswers;
    return quiz;
  }
}

export default Quiz;
