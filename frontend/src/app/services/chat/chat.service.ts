import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url : string = 'http://localhost:5000/api/message/'
  
  constructor(private http : HttpClient) { }

  getAllMessages() : Observable<any[]> {
    return this.http.get<any>(this.url)
  }

  saveMessage(username : string, content : string) : Observable<any> {
    return this.http.post(this.url,{username,content})
  } 

}
