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

function formatDateTime(dateString: string): string {
  let date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

function formatQuestionType(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export {
  isInstanceOfQuiz,
  isInstanceOfSlide,
  isInstanceOfTrueFalseQuiz,
  formatDateTime,
  formatQuestionType
};
