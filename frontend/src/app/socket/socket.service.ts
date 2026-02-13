import { Injectable } from '@angular/core';
import { Messages, UserMessageInput } from '@shared/types';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { fromEvent, map, Observable } from 'rxjs';

interface ISocketService {
  sendMessage(data: Messages): void;
  watchNewMessage$(): Observable<Messages>;
  join(user: string): void;
  watchUsersConnect$(): Observable<number>;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService implements ISocketService {
  // Define socket service class
  private static instanceCount = 0;
  private socket: Socket;

  constructor() {
    SocketService.instanceCount++;
    console.log('SocketService constructed. count=', SocketService.instanceCount);
    
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

  join(user: string) {
    this.socket.emit('user:join', user);
  }

  watchUsersConnect$(): Observable<number> {
    return fromEvent(this.socket, 'numConnected');
  }
}
