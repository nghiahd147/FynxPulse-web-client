export interface LoginPayload {
  email: string
  password: string
}

export interface LogoutPayload {
  refresh_token: string
}

export interface FollowUserPayload {
  follower_user_id: string
}

export interface ChangePasswordPayload {
  old_password?: string
  password?: string
  confirm_password?: string
}

export interface ActionResult {
  success: boolean
  message?: string | unknown
}

// User

export interface ParamsUser {
  page: number
  page_size: number
}

export interface Users {
  _id?: string
  first_name?: string
  last_name?: string
  user_name?: string
  email?: string
  avatar?: string
  password?: string
  confirm_password?: string
  date_of_birth?: string
  mutual_friends_count?: string
}

export interface ProfileUser {
  _id?: string
  first_name?: string
  last_name?: string
  user_name?: string
  date_of_birth?: Date
  bio?: string
  location?: string
  website?: string
  avatar?: string
  profile_picture_url?: string
  following_count?: number
  followers_count?: number
}
