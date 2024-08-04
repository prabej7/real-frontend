import Message from "./message";
import Rooms from "./rooms";

interface User {
  email: string;
  _id: string;
  password?: string;
  phone?: string;
  location?: Location;
  fullName?: string;
  address?: string;
  isVerified: Boolean;
  avatar?: String;
  rooms?: Rooms[];
  messages?: Message;
  messageId?: string;
}

export default User;
