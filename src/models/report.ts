export class KapoReport {
    id: number;
    code: string;
    name: string;
    type: string;
    templateId: number;
    template: any;
    hostId: number;
    host: any;
    status: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    settings: {
      randomizeQuestions: boolean;
      randomizeAnswers: boolean;
    };
    gameUrl: string;
    playerCount: number;
  
    constructor(name: string = '', createdAt: Date = new Date(), playerCount: number = 0) {
      this.id = 0;
      this.code = '';
      this.name = name;
      this.type = '';
      this.templateId = 0;
      this.template = null;
      this.hostId = 0;
      this.host = null;
      this.status = '';
      this.startTime = '';
      this.endTime = '';
      this.createdAt = createdAt.toISOString();
      this.settings = {
        randomizeQuestions: false,
        randomizeAnswers: false
      };
      this.gameUrl = '';
      this.playerCount = playerCount;
    }
  }