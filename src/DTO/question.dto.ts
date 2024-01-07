import { ChoiceDTO } from './choice.dto';

export class QuestionDTO {
  id: number = 0;
  content: string = '';
  type: string = '';
  limitTime: number = 0;
  points: number = 0;
  choices: ChoiceDTO[] = [];
  
  templateId: number = 0;
  image: string = '';
  createdAt: string = '';
  updatedAt: string = '';
}
