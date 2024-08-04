import User from "./user";

interface Message {
  _id: string;
  messages: [
    {
      isAdmin: boolean;
      adminMsg: string;
      userMsg: string;
    }
  ];
  user?: User;
}

export default Message;
