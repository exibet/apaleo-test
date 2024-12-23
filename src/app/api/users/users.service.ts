import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User, UsersResponse } from './types';
import { Params } from '../index';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(quryParams: Params = {}): Observable<User[]> {
    return this.http
      .get<UsersResponse>('https://dummyjson.com/user', {
        params: quryParams,
      })
      .pipe(
        map(({ users }) => users ?? []),
        catchError((err) => of(err))
      );
  }
}
