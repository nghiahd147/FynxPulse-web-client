export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {
  refresh_token: string;
}

export interface FollowUserPayload {
  follower_user_id: string;
}

export interface ChangePasswordPayload {
  old_password?: string;
  password?: string;
  confirm_password?: string;
}
