export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
  isSubscribed: boolean;
  userDetails: UserDetails;
}

export interface UserDetails {
  id: string;
  phoneNumber: number;
  age: number;
  dateOfBirth: string;
  gender: string;
  city: string;
  country: string;
  userId: string;
}

export interface CreateUserDetailsReq {
  phoneNumber: number;
  age: number;
  dateOfBirth: string;
  gender: string;
  city: string;
  country: string;
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
