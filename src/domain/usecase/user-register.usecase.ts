import { Observable } from 'rxjs';
import { UseCase } from '../../core/use-case';
import { User } from '../model/user';
import { UserRepository } from '../repository/user.repository';

export class UserRegisterUseCase
  implements UseCase<{ name: string; email: string; password: string }, User>
{
  constructor(private userRepository: UserRepository) {}
  execute(params: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.userRepository.register(params);
  }
}
