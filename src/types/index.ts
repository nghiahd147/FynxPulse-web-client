export type ActionResult = {
  success: boolean;
  message?: string;
};
export interface Users {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}
