import Checkable from './checkable';
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
}

export default TrueOrFalseQuiz;
