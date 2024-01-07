import { QuestionDTO } from "src/DTO/question.dto";
import Cloneable from "./cloneable";

abstract class Kapo implements Cloneable {
  static lastId = 0;

  id: number;
  title: string = "";
  media: string = "";

  constructor() {
    this.id = Kapo.lastId++;
  }
  
  abstract getFieldsForUI(): string[];
  
  abstract clone(): Cloneable;

  abstract toQuestionDTO(): QuestionDTO;
}

export default Kapo;