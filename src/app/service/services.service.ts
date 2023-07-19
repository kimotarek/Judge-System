import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../objects/users';

@Injectable({
  providedIn: 'root'
})
export class ServicService {

  private apiServerUrl = 'https://dark-ruby-slug.cyclic.app';
  user!: users;
  upcoming_ex!:any[];
  token_ex!:any[];
  non_token!:any[];
  ids_ex!:any[];
  constructor(private http: HttpClient) { }

  


//send user with email and pass if the user not found recive json="success=false"else recive json="success=true ,user:user" with all data
public login(user:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/login`,user, { withCredentials: true });
}}
