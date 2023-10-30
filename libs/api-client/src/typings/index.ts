export type ResponseStatus = 'success' | 'error' | 'fail';

export interface Response {
  status: ResponseStatus;
  message?: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  avatar: string;
  verified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}
