export class CreatorDTO {
  id: number = 0;
  username: string = '';
  avatar: string = '';

  static null(): CreatorDTO {
    return {
      id: 0,
      username: 'No username',
      avatar: 'No avatar',
    };
  }
}
