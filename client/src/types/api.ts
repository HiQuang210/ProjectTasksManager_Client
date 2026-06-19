export interface AddUserDto {
  name: string;
  title: string;
  email: string;
  password: string;
  role: string;
}

export interface ChangePasswordForm {
  oldPassword: string;
  password: string;
  confirmpass: string;
}