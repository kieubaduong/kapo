import Kapo from './kapo';

class Quiz extends Kapo {
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

  override getFieldsForUI(): string[] {
    return ['time-limit', 'points', 'answer-options'];
  }

}

export default Quiz;
