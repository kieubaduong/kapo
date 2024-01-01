export class TimeDTO {
  time: string = '';
  valid: boolean = true;

  static null(): TimeDTO {
    return {
      time: 'NULL_OBJECT',
      valid: false,
    };
  }
}
