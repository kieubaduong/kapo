import { Observable } from 'rxjs';
import { UseCase } from '../../core/use-case';
import { User } from '../model/user';
import { UserRepository } from '../repository/user.repository';

export class UserLoginUseCase
  implements UseCase<{ username: string; password: string }, User>
{
  constructor(private userRepository: UserRepository) {}

  execute(params: { username: string; password: string }): Observable<User> {
    return this.userRepository.login(params);
  }
}
