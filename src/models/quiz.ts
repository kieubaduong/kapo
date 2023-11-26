import Checkable from './checkable';
import Kapo from './kapo';

class Quiz extends Kapo implements Checkable {
  questionType: string = 'Quiz';
  timeLimit: number = 5;
  minTimeLimit: number = 5;
  points: string = 'standard';
  answerOptions: string = 'single-select';
  answers: string[] = new Array(4).fill(null);
  correctAnswers: boolean[] = new Array(4).fill(false);

  constructor() {
    super();
  }

  validate(): string[] {
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

    const selectedCorrectAnswers = this.correctAnswers.filter((answer) => answer === true);
    if (selectedCorrectAnswers.length === 0) {
      errors.push('Correct answer not selected');
    }

    return errors;
  }

  override getFieldsForUI(): string[] {
    return ['time-limit', 'points', 'answer-options'];
  }

}

export default Quiz;
