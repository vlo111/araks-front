export type SignInForm = {
  email: string;
  password: string;
};

export type ForgotPasswordForm = {
  email: string;
};

export type ResetPasswordForm = {
  new_password: string;
  token: string;
};

export interface UserDetails {
  avatar?: string;
  bio?: string;
  created_at: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  updated_at: string;
  username?: string;
}

export interface User {
  user: UserDetails;
  access_token?: string;
}

export type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
};

export type ProfilePassword = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type PasswordResponseData = { data: { success: string; data: UserDetails; message: string } };

export type PasswordResponseDataError = { response: { data: { message: string } } };
