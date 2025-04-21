import { Component } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  username: string = '';
  message : String = ''
  messages : { username: any; content: any; }[] = []


  constructor(private socketService : SocketService, private chatService : ChatService) {}

  ngOnInit() {

    // Load previous messages
    this.chatService.getAllMessages().subscribe((data) => {
      this.messages = data.map((m:any) =>({
        username : m.username,
        content : m.content
      }))
    })

    this.socketService.getAllMessages().subscribe((msg) => {
      this.messages.push(msg);
    })
  }

}
