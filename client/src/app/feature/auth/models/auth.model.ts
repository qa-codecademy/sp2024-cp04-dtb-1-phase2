export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface UserCredentails {
  email: string;
  password: string;
}

export interface RegisterReq {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
