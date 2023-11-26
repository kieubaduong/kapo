class KapoError {
  name: string;
  title: string;
  errors: string[];

  constructor(name: string, title: string, errors: string[]) {
    this.name = name;
    this.title = title;
    this.errors = errors;
  }
}

export default KapoError;