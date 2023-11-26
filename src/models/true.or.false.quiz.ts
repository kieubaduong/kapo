import Checkable from "./checkable";
import Kapo from "./kapo";

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

  validate(): string[] {
    let errors: string[] = [];

    if (this.title.trim().length === 0) {
      errors.push('Question missing');
    }

    return errors;
  }

}

export default TrueOrFalseQuiz;