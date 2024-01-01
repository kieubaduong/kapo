import { TemplateDTO } from './template.dto';
import { UserDTO } from './user.dto';

export class GameDTO {
  id: number = 0;
  code: string = '';
  name: string = '';
  type: string = '';
  templateId: number = 0;
  template: TemplateDTO = new TemplateDTO();
  hostId: number = 0;
  host: UserDTO = new UserDTO();
  status: string = '';
  startTime: string = '';
  endTime: string = '';
  createdAt: string = '';
  settings: any = {};
  gameUrl: string = '';

  static null(): GameDTO {
    return {
      id: -1,
      code: 'NULL_OBJECT',
      name: 'NULL_OBJECT',
      type: 'NULL_OBJECT',
      templateId: -1,
      template: TemplateDTO.null(),
      hostId: -1,
      host: UserDTO.null(),
      status: 'NULL_OBJECT',
      startTime: 'NULL_OBJECT',
      endTime: 'NULL_OBJECT',
      createdAt: 'NULL_OBJECT',
      settings: {},
      gameUrl: 'NULL_OBJECT',
    };
  }
}
