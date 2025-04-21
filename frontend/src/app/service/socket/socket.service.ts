import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket : Socket

  constructor() { 
    this.socket = io("http://localhost:5000/")
  }

  sendMessage(username : string, content : string) : void {
    this.socket.emit('chat message',{username,content})
  }

  getMessage(): Observable<{ username: string; content: string }> {
    return new Observable((observer) => {
      this.socket.on('chat message', (msg: { username: string; content: string }) => {
        observer.next(msg);
      });
    });
  }

  sendTyping(username: string) {
    this.socket.emit('typing', { username, typing: true });
  }

  stopTyping(username: string) {
    this.socket.emit('typing', { username, typing: false });
  }

  getTypingStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('display', (data) => {
        observer.next(data);
      });
    });
  }

  // active users
  sendNewUser(username : string) {
    this.socket.emit('new user', username)
  }

  getActiveUsers(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('active users', (users: string[]) => {
        observer.next(users);
      });
    });
  }

  // Sending a private message to a specific user
  sendPrivateMessage(sender: string, receiver: string, message: string) {
    this.socket.emit('private message', { sender, receiver, message });
  }

  // Receiving private messages from the server
  getPrivateMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('private message', (data) => {
        observer.next(data);
      });
    });
  }

}
