interface User {
  name: string;
  image: string;
  email: string;
  id: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timeStamp: number;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
}
