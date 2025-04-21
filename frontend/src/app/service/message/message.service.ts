import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = "http://localhost:5000/api/messages" 

  constructor(private http : HttpClient) { }

  saveMessage(username : string, content : string) {
    return this.http.post<any>(this.url, { username, content })
  }

  getMessage() {
    return this.http.get<any[]>(this.url)
  }

}

