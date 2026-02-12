import { Component, OnInit, signal } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Messages, User } from '@shared/types';
import { form, FormField, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  title = 'Chat';
  handShakeResponse: string = '';

  user = signal<User>({
    id: '',
    name: '',
    messages: [],
    joined: false,
  });

  messages = signal<Messages[]>([]);
  messageModel = signal({
    message: '',
  });
  messageForm = form(this.messageModel, (schemaPath) => {
    required(schemaPath.message, { message: 'Message cannot be empty' });
  });

  private socketConnection: SocketService;

  constructor(socketService: SocketService) {
    this.socketConnection = socketService;
  }

  ngOnInit(): void {
    this.socketConnection.watchNewMessage$().subscribe((msg) => {
      if (msg.ownerId === this.user().name) {
        return;
      }
      if (this.messages().length < 1) {
        this.messages.set([msg]);
        return;
      }
      this.messages.update((messages) => [...messages, msg]);
    });
    this.user.set({
      id: crypto.randomUUID(),
      name: '',
      messages: [],
      joined: true,
    });
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    submit(this.messageForm, async () => {
      const message = this.messageModel().message;
      if (!message) {
        return;
      }
      this.messages.update((messages) => [
        ...messages,
        {
          id: crypto.randomUUID(),
          ownerId: this.user().name,
          message: message,
          timestap: new Date(),
        },
      ]);

      this.socketConnection.sendMessage({
        id: crypto.randomUUID(),
        ownerId: this.user().name,
        message: message,
        timestap: new Date(),
      });
    });
  }

  setUsername(username: string): void {
    this.user.update((u) => ({
      ...u,
      name: username,
    }));
  }
}
