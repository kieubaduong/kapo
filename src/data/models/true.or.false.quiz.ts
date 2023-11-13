import Kapo from "./kapo";

class TrueOrFalseQuiz extends Kapo {
  answer: boolean | null = null;
  timeLimit: number = 5;
  minTimeLimit: number = 5;
  points: string = 'standard'; 

  constructor() {
    super();
  }

  override getFieldsForUI(): string[] {
    return ['time-limit', 'points'];
  }

}

export default TrueOrFalseQuiz;