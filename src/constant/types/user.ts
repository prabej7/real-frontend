interface User {
  email: string;
  _id: string;
  password?: string;
  phone?: string;
  location?: Location;
  fullName?: string;
  address?: string;
}

export default User;
