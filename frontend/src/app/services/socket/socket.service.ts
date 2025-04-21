import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url : string = "http://localhost:5000"
  private socket : Socket

  constructor() { 
    this.socket = io(this.url)
  }

  sendMessage(username : string, content : string) : void {
    this.socket.emit('chat message', {username, content})
  }

  getAllMessages() : Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chat message', (msg) => {
        observer.next(msg)
      })
    })
  }

}
