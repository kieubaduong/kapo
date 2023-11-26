import Kapo from './kapo';

class Slide extends Kapo {
  content: string | null = null;
  backgroundColor: string = 'Current theme';
  reaction: boolean = false;
  slideLayout: string = 'Classic';

  constructor() {
    super();
  }

  override getFieldsForUI(): string[] {
    return ['background-color', 'reaction', 'slide-layout'];
  }

}

export default Slide;
