import { CreatorDTO } from './creator.dto';
import { QuestionDTO } from './question.dto';

export class TemplateDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  cover: string = '';
  isPublic: boolean = false;
  creatorId: number = 0;
  questions: QuestionDTO[] = [];
  gameCount: number = 0;
  creator: CreatorDTO = { id: 0, username: '', avatar: '' };
  createdAt: string = '';
  updatedAt: string = '';

  static null(): TemplateDTO {
    return {
      id: 0,
      title: 'No title',
      description: 'No description',
      cover: 'No cover',
      isPublic: false,
      creatorId: 0,
      questions: [],
      gameCount: 0,
      creator: CreatorDTO.null(),
      createdAt: 'No creation date',
      updatedAt: 'No update date',
    };
  }
}
