export interface User {
  _id: string;
  name: string;
  email: string;
  title?: string;
  role?: string;
  isAdmin?: boolean;
}