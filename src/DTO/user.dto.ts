export class UserDTO {
  email: string = '';
  id: number = 0;
  username: string = '';

  static null(): UserDTO {
    return {
      email: 'NULL_OBJECT',
      id: -1,
      username: 'NULL_OBJECT',
    };
  }
}
