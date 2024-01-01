import { AnswerReportDTO } from './answer.report.dto';

export class ReportQuestionDTO {
  id: number = 0;
  content: string = '';
  type: string = '';
  templateId: number = 0;
  gameId: number = 0;
  image: string = '';
  limitTime: number = 0;
  points: number = 0;
  answersCount: number = 0;
  correctCount: number = 0;
  answersReport: AnswerReportDTO[] = [];
}
