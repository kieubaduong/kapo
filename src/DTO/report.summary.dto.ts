import { GameDTO } from "./game.dto";
import { QuestionReportShortDTO } from "./question.report.short.dto";
import { ReportPlayerDTO } from "./report.player";

export class ReportSummaryDTO {
  gameId: number = 0;
  game: GameDTO = new GameDTO();
  totalPlayerCount: number = 0;
  totalQuestion: number = 0;
  totalTime: number = 0;
  difficultQuestions: QuestionReportShortDTO[] = [];
  needHelpQuestions: ReportPlayerDTO[] = [];
  notFinishedPlayers: ReportPlayerDTO[] = [];

  static null(): ReportSummaryDTO {
    return {
      gameId: 0,
      game: GameDTO.null(),
      totalPlayerCount: 0,
      totalQuestion: 0,
      totalTime: 0,
      difficultQuestions: [],
      needHelpQuestions: [],
      notFinishedPlayers: [],
    };
  }
}