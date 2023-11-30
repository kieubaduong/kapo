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

  override clone(): Slide {
    const slide = new Slide();
    slide.id = this.id;
    slide.title = this.title;
    slide.media = this.media;
    slide.content = this.content;
    slide.backgroundColor = this.backgroundColor;
    slide.reaction = this.reaction;
    slide.slideLayout = this.slideLayout;
    return slide;
  }

}

export default Slide;
