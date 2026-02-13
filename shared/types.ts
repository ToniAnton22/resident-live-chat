export type User = {
  id: string;
  name: string;
  messages: Messages[];
  joined: boolean;
};

export type Messages = {
  id: string;
  ownerId: string;
  message: string;
  timestamp: string;
};

export interface UserMessageInput {
  name: string;
  message: string;
  timestamp: string;
}

export interface UserInput {
  id: string;
  name: string;
}
