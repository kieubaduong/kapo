import Kapo from 'src/models/kapo';
import QuesTion from 'src/models/question';
import Quiz from 'src/models/quiz';
import TrueOrFalseQuiz from 'src/models/true.or.false.quiz';

function KapoToQuestionsMapper(kapo: Kapo): QuesTion[] {
  if (kapo instanceof Quiz) {
    return kapo.answers.map(
      (answer, index) => new QuesTion(answer, kapo.correctAnswers[index])
    );
  } else if (kapo instanceof TrueOrFalseQuiz) {
    const possibleAnswers = ['True', 'False'];
    return possibleAnswers.map((answer) => {
      const isCorrect =
        answer.toLowerCase() === kapo.answer.toString().toLowerCase();
      return new QuesTion(answer, isCorrect);
    });
  }
  return [];
}

export default KapoToQuestionsMapper;
