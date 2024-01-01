class QuesTion {
  title: string;
  status: boolean;

  constructor(title: string, state: boolean) {
    this.title = title;
    this.status = state;
  }

  static empty(): QuesTion {
    return new QuesTion('', false);
  }
}

export default QuesTion;
