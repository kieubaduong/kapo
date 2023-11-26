import Quiz from './models/quiz';
import Slide from './models/slide';
import TrueOrFalseQuiz from './models/true.or.false.quiz';

function isInstanceOfQuiz(item: any): boolean {
  return item instanceof Quiz;
}

function isInstanceOfSlide(item: any): boolean {
  return item instanceof Slide;
}

function isInstanceOfTrueFalseQuiz(item: any): boolean {
  return item instanceof TrueOrFalseQuiz;
}

export {
  isInstanceOfQuiz,
  isInstanceOfSlide,
  isInstanceOfTrueFalseQuiz,
};
