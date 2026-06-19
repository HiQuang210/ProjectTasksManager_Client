export interface User {
  _id: string;
  name: string;
  email: string;
  title?: string;
  role?: string;
  createdAt?: string;
  isActive?: boolean;
  isAdmin?: boolean;
}