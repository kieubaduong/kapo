import { ChoiceDTO } from './choice.dto';

export class QuestionDTO {
  id: number = 0;
  content: string = '';
  type: string = '';
  image: string = '';
  templateId: number = 0;
  limitTime: number = 0;
  points: number = 0;
  choices: ChoiceDTO[] = [];
  createdAt: string = '';
  updatedAt: string = '';
}
