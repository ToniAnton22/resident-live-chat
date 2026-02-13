import { Injectable } from '@angular/core';
import { Messages, UserMessageInput } from '@shared/types';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { fromEvent, map, Observable } from 'rxjs';

interface ISocketService {
  sendMessage(data: Messages): void;
  watchNewMessage$(): Observable<Messages>;
  watchUsersConnect$(): Observable<number>;
  destroy(): void;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService implements ISocketService {
  // Define socket service class
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      reconnectionDelayMax: 10000,
      auth: { token: 'Auth-token' },
    });
  }

  sendMessage(data: Messages): void {
    this.socket.emit('messages', data);
  }
  watchNewMessage$(): Observable<Messages> {
    return fromEvent(this.socket, 'messages');
  }

  watchUsersConnect$(): Observable<number> {
    return fromEvent(this.socket, 'numConnected');
  }

  destroy(): void {
    this.socket.disconnect();
  }
}
