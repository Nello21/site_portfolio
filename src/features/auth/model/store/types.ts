export type User = {
  id: number;
  fullName: string;
  email: string;
  token: string;
  avatar: string;
};

export type Users = {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
};

export type Review = {
  movies_data_id: number;
  user_id: number;
  review: string;
  rating: number;
};

export type ReviewWithUser = {
  review: Review;
  user: User;
};

export type UserResponse = {
  data: User;
  token: string;
};

export type AuthRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
};
