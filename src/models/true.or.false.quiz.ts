import { QuestionDTO } from 'src/DTO/question.dto';
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

  override toQuestionDTO(): QuestionDTO {
    const questionDTO = new QuestionDTO();
    questionDTO.id = this.id;
    questionDTO.content = this.title;
    questionDTO.type = 'true_false';
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
    questionDTO.choices = [
      {
        id: 0,
        content: 'True',
        isCorrect: this.answer,
      },
      {
        id: 1,
        content: 'False',
        isCorrect: !this.answer,
      },
    ];
    return questionDTO;
  }

  public static fromQuestionDTO(questionDTO: QuestionDTO): TrueOrFalseQuiz {
    const trueOrFalseQuiz = new TrueOrFalseQuiz();
    trueOrFalseQuiz.id = questionDTO.id;
    trueOrFalseQuiz.title = questionDTO.content;
    trueOrFalseQuiz.media = questionDTO.image;
    trueOrFalseQuiz.answer = questionDTO.choices[0].isCorrect;
    trueOrFalseQuiz.timeLimit = questionDTO.limitTime;
    switch (questionDTO.points) {
      case 100:
        trueOrFalseQuiz.points = 'standard';
        break;
      case 200:
        trueOrFalseQuiz.points = 'double-points';
        break;
      case 0:
        trueOrFalseQuiz.points = 'no-points';
        break;
    }
    return trueOrFalseQuiz;
  }
}

export default TrueOrFalseQuiz;
