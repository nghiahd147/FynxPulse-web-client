export interface ActionResult {
  success: boolean;
  message?: string | unknown;
}

export interface ParamsUser {
  page: number;
  page_size: number;
}

export interface Users {
  _id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  avatar: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}

export interface ProfileUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  date_of_birth?: Date;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  profile_picture_url?: string;
}
