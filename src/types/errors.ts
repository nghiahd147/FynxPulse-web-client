export interface ApiError {
  message: string;
  errors: {
    [key: string]: {
      location: string;
      msg: string;
      path: string;
      type: string;
      value: string;
    };
  };
}
