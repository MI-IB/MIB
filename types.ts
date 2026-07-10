export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  status?: 'online' | 'offline';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'call';
}