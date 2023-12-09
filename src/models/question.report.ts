class PlayerReport {
    name: string;
    answer: string;
    correct: boolean;
    time: number;
    points: number;

    constructor(name: string, answer: string, correct: boolean, time: number, points: number) {
        this.name = name;
        this.answer = answer;
        this.correct = correct;
        this.time = time;
        this.points = points;
    }
}

class QuestionReport {
    title: string;
    image: string;
    type: string;
    timeLimit: number;
    correctPercentage: number;

    answers: string[];
    correctAnswers: boolean[];
    countAnswers: number[];

    players: PlayerReport[];
    avgAnswerTime: number;
    playersAnswered: number;

    constructor(title: string, image: string, type: string, timeLimit: number, answers: string[], correctAnswers: boolean[], players: PlayerReport[]) {
        this.title = title;
        this.image = image;
        this.type = type;
        this.timeLimit = timeLimit;
        this.answers = answers;
        this.correctAnswers = correctAnswers;
        this.players = players;

        this.avgAnswerTime = players.reduce((acc, player) => acc + player.time, 0) / players.length;
        this.playersAnswered = players.length;
        this.countAnswers = this.answers.map((_, i) => players.reduce((acc, player) => acc + (player.answer === this.answers[i] ? 1 : 0), 0));
        this.correctPercentage = this.countAnswers.reduce((acc, count, i) => acc + (this.correctAnswers[i] ? count : 0), 0) / players.length * 100;
    }
}

export { PlayerReport };
export default QuestionReport;
