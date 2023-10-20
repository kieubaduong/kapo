import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository } from 'src/domain/repository/user.repository';
import { User } from 'src/domain/model/user';
import { UserRequest } from '../request/user.request';
import { UserMapper } from '../mapper/user.mapper';
import { UserResponse } from '../response/user.response';
@Injectable({
  providedIn: 'root',
})
export class UsernRepositoryImpl extends UserRepository {
  userMapper = new UserMapper();
  
  constructor(private http: HttpClient) {
    super();
  }

  login(params: { username: string; password: string }): Observable<User> {
    return this.http
      .post<UserResponse>('https://example.com/login', { params })
      .pipe(map(this.userMapper.fromResponse));
  }

  register(params: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<UserResponse>('https://example.com/register', { params })
      .pipe(map(this.userMapper.fromResponse));
  }
}
