import Kapo from './kapo';

class Template {
  title: string = '';
  image: string = '';
  totalQuestions: number = 0;
  hostName: string = '';
  totalPlayers: number = 0;
  kapoes: Kapo[] = [];

  constructor(
    title: string,
    image: string,
    totalQuestions: number,
    hostName: string,
    totalPlayers: number
  ) {
    this.title = title;
    this.image = image;
    this.totalQuestions = totalQuestions;
    this.hostName = hostName;
    this.totalPlayers = totalPlayers;
  }

  setKapoes(kapoes: Kapo[]) {
    this.kapoes = kapoes;
  }
}

export default Template;
