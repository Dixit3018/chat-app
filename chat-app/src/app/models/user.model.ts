export interface IAuthRes {
  user: {
    _id: string;
    username: string;
    email: string;
    image: string;
    __v?: 0;
  };
  token: string;
}

export interface ILoginDTO {
  username: string;
  password: string;
}

export interface ISignupDTO {
  username: string;
  email: string;
  password: string;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface IChatUserList extends IUser {
  lastMessage: {
    _id: string;
    message: string;
    createdAt: string;
  };
}
