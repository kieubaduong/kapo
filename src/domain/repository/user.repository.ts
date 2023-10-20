import { Observable } from 'rxjs';
import { User } from '../model/user';

export abstract class UserRepository {
    
  abstract login(params: {
    username: string;
    password: string;
  }): Observable<User>;

  abstract register(params: {
    name: string;
    email: string;
    password: string;
  }): Observable<User>;

}
