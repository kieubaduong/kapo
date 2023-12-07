class Player {
  nickname: string;
  rank: number;
  correctAnswers: number;
  unanswered: number;
  finalScore: number;
  constructor(
    nickname: string,
    rank: number,
    correctAnswers: number,
    unanswered: number,
    finalScore: number
  ) {
    this.nickname = nickname;
    this.rank = rank;
    this.correctAnswers = correctAnswers;
    this.unanswered = unanswered;
    this.finalScore = finalScore;
  }
}

export default Player;
