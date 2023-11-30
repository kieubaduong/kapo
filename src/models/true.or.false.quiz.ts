import Checkable from './checkable';
import Cloneable from './cloneable';
import Kapo from './kapo';
import KapoError from './kapo.error';

class TrueOrFalseQuiz extends Kapo implements Checkable {
  answer: boolean = true;
  timeLimit: number = 5;
  minTimeLimit: number = 5;
  points: string = 'standard';

  constructor() {
    super();
  }

  override getFieldsForUI(): string[] {
    return ['time-limit', 'points'];
  }

  validate(): KapoError {
    let errors: string[] = [];

    if (this.title.trim().length === 0) {
      errors.push('Question missing');
    }

    const name: string = this.id + 1 + ' - ' + 'True or false';
    const question: string = this.title;
    return new KapoError(name, question, errors);
  }

  override clone(): Cloneable {
    const trueOrFalseQuiz = new TrueOrFalseQuiz();
    trueOrFalseQuiz.id = this.id;
    trueOrFalseQuiz.title = this.title;
    trueOrFalseQuiz.media = this.media;
    trueOrFalseQuiz.answer = this.answer;
    trueOrFalseQuiz.timeLimit = this.timeLimit;
    trueOrFalseQuiz.points = this.points;
    return trueOrFalseQuiz;
  }
}

export default TrueOrFalseQuiz;
