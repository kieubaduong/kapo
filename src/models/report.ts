class KapoReport {
    name: string;
    date: Date;
    playerCount: number;

    constructor(name: string, date: Date, playerCount: number) {
        this.name = name;
        this.date = date;
        this.playerCount = playerCount;
    }
}

export default KapoReport;
