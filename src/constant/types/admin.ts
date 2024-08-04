import Rooms from "./rooms";

interface Admin {
  username?: string;
  email?: string;
  role?: string;
  rooms: Rooms[];
  tenants: string[];
}
