export class ReportUserDTO {
  id: number = 0;
  username: string = '';
  points: number = 0;
  rank: number = 0;
  answersCount: number = 0;
  unansweredCount: number = 0;
  correctAnswersCount: number = 0;
  correctRate: number = 0;
  streakCount: number = 0;
  CreatedAt: string = '';
  gameId: number = 0;
  questions: any = null;
}
