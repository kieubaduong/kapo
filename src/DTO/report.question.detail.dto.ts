class AnswerReportDTO {
  id: number = 0;
  content: string = '';
  isCorrect: boolean = false;
  count: number = 0;
}

class PlayerAnswerDTO {
  username: string = '';
  answers: string[] = [];
  isCorrect: boolean = false;
  time: number = 0;
  points: number = 0;
  answered: boolean = false;
}

export class ReportQuestionDetailDTO {
  id: number = 0;
  content: string = '';
  type: string = '';
  templateId: number = 0;
  gameId: number = 0;
  image: string = '';
  limitTime: number = 0;
  points: number = 0;
  answers: any = null;
  answersCount: number = 0;
  correctCount: number = 0;
  answersReport: AnswerReportDTO[] = [];
  playerAnswers: PlayerAnswerDTO[] = [];
}
