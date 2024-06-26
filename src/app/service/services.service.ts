import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../objects/users';

@Injectable({
  providedIn: 'root'
})
export class ServicService {

  private apiServerUrl = 'https://exam-system-457n.onrender.com';
  user!: users;
  upcoming_ex!:any[];
  token_ex!:any[];
  non_token!:any[];
  ids_ex!:any[];
  constructor(private http: HttpClient) { }

  


//send user with email and pass if the user not found recive json="success=false"else recive json="success=true ,user:user" with all data
public login(user:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/login`,user, { withCredentials: true });
}

public send_exam_code(code:string):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/examination/get_exam`,{code:code}, { withCredentials: true });
}
public save_answer(saved_exam_id:any,mcq_id:any,user_answer:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/examination/set_mcq_answer`,{saved_exam_id:saved_exam_id,mcq_id:mcq_id,user_answer:user_answer}, { withCredentials: true });
}

public check_answer(saved_exam_id:any,coding_id:any,user_answer:any,language_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/examination/run_coding`,{saved_exam_id:saved_exam_id,coding_id:coding_id,user_answer:user_answer,language_id:language_id}, { withCredentials: true });
}

public submit(saved_exam_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/examination/submit_exam`,{saved_exam_id:saved_exam_id}, { withCredentials: true });
}
}
