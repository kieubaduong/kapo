abstract class Kapo {
  static lastId = 0;

  id: number;
  title: string = "";
  media: string | null = null;

  constructor() {
    this.id = Kapo.lastId++;
  }

  abstract getFieldsForUI(): string[];
}

export default Kapo;