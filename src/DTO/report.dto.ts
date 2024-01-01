import { SettingDTO } from './setting.dto';
import { TemplateDTO } from './template.dto';
import { TimeDTO } from './time.dto';
import { UserDTO } from './user.dto';

export class ReportDTO {
  id: number = 0;
  code: string = '';
  name: string = '';
  type: string = '';
  templateId: number = 0;
  template: TemplateDTO = new TemplateDTO();
  hostId: number = 0;
  host: UserDTO = new UserDTO();
  status: string = '';
  startTime: TimeDTO = new TimeDTO();
  endTime: TimeDTO = new TimeDTO();
  createdAt: string = '';
  settings: SettingDTO = new SettingDTO();
  gameUrl: string = '';
  playerCount: number = 0;

  static null(): ReportDTO {
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
      startTime: TimeDTO.null(),
      endTime: TimeDTO.null(),
      createdAt: 'NULL_OBJECT',
      settings: SettingDTO.null(),
      gameUrl: 'NULL_OBJECT',
      playerCount: -1,
    };
  }
}
