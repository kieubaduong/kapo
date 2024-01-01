export class SettingDTO {
  randomizeQuestions: boolean = false;
  randomizeAnswers: boolean = false;

  static null(): SettingDTO {
    return {
      randomizeQuestions: false,
      randomizeAnswers: false,
    };
  }
}
