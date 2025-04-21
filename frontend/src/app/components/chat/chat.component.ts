import { Component } from '@angular/core';
import { SocketService } from '../../service/socket/socket.service';
import { MessageService } from '../../service/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message: string = '';
  messages: { username: string; content: string }[] = [];
  username: string = '';
  tempUsername: string = ''; // used before registration
  hasSentUsername: boolean = false; // to prevent multiple emits

  typingMessage: string = '';
  typingTimeout: any;
  activeUsers: string[] = [];

  privateMessageReceiver: string = ''; // Holds the recipient's username for private messages

  constructor(
    private socketService: SocketService,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    // Load previous messages
    this.msgService.getMessage().subscribe((data) => {
      this.messages = data.map((m: any) => ({
        username: m.username,
        content: m.content,
      }));
    });

    // Real-time incoming messages (for both public and private)
    this.socketService.getMessage().subscribe((msg) => {
      this.messages.push(msg);
    });

    // Private messages
    this.socketService.getPrivateMessage().subscribe((data) => {
      this.messages.push({
        username: data.sender,
        content: `(Private) ${data.message}`,
      });
    });

    // Typing indicator
    this.socketService.getTypingStatus().subscribe((data) => {
      this.typingMessage = data.typing ? `${data.username} is typing...` : '';
    });

    // Active users
    this.socketService.getActiveUsers().subscribe((data) => {
      this.activeUsers = data;
    });
  }

  // Called once when user registers
  registerUsername() {
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername.trim();
      this.socketService.sendNewUser(this.username);
      this.hasSentUsername = true;
    }
  }

  // Send message to all users
  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.username, this.message);
      this.msgService.saveMessage(this.username, this.message).subscribe();
      this.message = ''; // Clear message input after sending
    }
  }

  // Handle sending private message
  sendPrivateMessage() {
    if (this.message.trim() && this.privateMessageReceiver.trim()) {
      this.socketService.sendPrivateMessage(
        this.username,
        this.privateMessageReceiver,
        this.message
      );
      this.message = ''; // Clear message input after sending
    }
  }

  // Typing indicator logic
  onTyping() {
    if (this.username.trim()) {
      this.socketService.sendTyping(this.username);

      if (this.typingTimeout) clearTimeout(this.typingTimeout);

      this.typingTimeout = setTimeout(() => {
        this.socketService.stopTyping(this.username);
      }, 1000);
    }
  }

  // Select private message recipient
  selectPrivateReceiver(username: string) {
    this.privateMessageReceiver = username;
  }
}
