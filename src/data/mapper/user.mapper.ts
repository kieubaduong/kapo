import { Mapper } from 'src/core/mapper';
import { UserResponse } from '../response/user.response';
import { User } from 'src/domain/model/user';
import { UserRequest } from '../request/user.request';

export class UserMapper extends Mapper<UserResponse, User, UserRequest> {

    fromResponse(param: UserResponse): User {
        return {
            id: param.id,
            fullName: param.fullName,
            username: param.username,
            profilePicture: param.profilePicture,
        };
    }

    toRequest(param: User): UserRequest {
        throw new Error('Method not implemented.');
    }
    
}
