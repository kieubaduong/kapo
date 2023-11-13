import Kapo from "./kapo";
import Quiz from "./quiz";
import Slide from "./slide";
import TrueOrFalseQuiz from "./true.or.false.quiz";

class KapoFactory {
  createQuestion(type: string): Kapo {
    switch (type) {
      case 'Quiz':
        return new Quiz();
      case 'Slide':
        return new Slide();
      case 'TrueOrFalse':
        return new TrueOrFalseQuiz();
      default:
        throw new Error('Invalid type');
    }
  }
}

export default KapoFactory;