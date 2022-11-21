import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI: string = 'http://127.0.0.1:5000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URI);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.URI}/${id}`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.URI, user);
  }

  putUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.URI}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.URI}/${id}`);
  }

}
