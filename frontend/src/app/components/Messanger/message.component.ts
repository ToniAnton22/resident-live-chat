import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Messages } from '@shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  title = 'Chat';
  handShakeResponse: string = '';
  username: string = '';
  messages: Messages[] = [];
  private socketConnection: SocketService;

  constructor(socketService: SocketService) {
    this.socketConnection = socketService;
  }

  ngOnInit(): void {
    this.socketConnection.watchNewMessage$().subscribe(msg => {
        this.messages.push(msg)
    })
  }
}
