import { Component, OnInit, output, signal } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Messages, User } from '@shared/types';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { ModalComponent } from '../Modal/modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormField, ModalComponent, DatePipe],
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  title = 'Chat';
  handShakeResponse: string = '';
  open = signal<boolean>(true);
  user = signal<User>({
    id: '',
    name: '',
    messages: [],
    joined: false,
  });
  numUsersConnected = signal<number>(0);
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

  handleUsernameChange(username: string) {
    if (username) {
      this.user.update((user) => ({
        ...user,
        name: username,
      }));
      this.socketConnection.sendMessage({
        id: crypto.randomUUID(),
        message: `${username} has joined the chat!`,
        timestamp: new Date().toDateString(),
        ownerId: 'system',
      });

      this.open.set(false);
    }
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
    this.socketConnection.watchUsersConnect$().subscribe((numConnected) => {
      this.numUsersConnected.set(numConnected);
    });
    this.user.set({
      id: crypto.randomUUID(),
      name: '',
      messages: [],
      joined: true,
    });
    this.open.set(true);
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
          timestamp: new Date().toDateString(),
        },
      ]);

      this.socketConnection.sendMessage({
        id: crypto.randomUUID(),
        ownerId: this.user().name,
        message: message,
        timestamp: new Date().toDateString(),
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
