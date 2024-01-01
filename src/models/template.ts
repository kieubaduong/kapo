import Kapo from './kapo';

class Template {
  id: number = 0;
  title: string = '';
  description: string = '';
  cover: string = '';
  isPublic: boolean = false;
  creatorId: number = 0;
  totalQuestions: number = 0;
  hostName: string = '';
  totalPlayers: number = 0;
  questions: Kapo[] = [];
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    title: string,
    cover: string,
    totalQuestions: number,
    hostName: string,
    totalPlayers: number
  ) {
    this.title = title;
    this.cover = cover;
    this.totalQuestions = totalQuestions;
    this.hostName = hostName;
    this.totalPlayers = totalPlayers;
  }

  setKapoes(kapoes: Kapo[]) {
    this.questions = kapoes;
  }
}

export default Template;
