import { cinemaData } from 'shared/types/cinemaData';

export type User = {
  id: number;
  fullName: string;
  email: string;
  token: string;
  avatar: string;
  favorites_movies: cinemaData[];
};

export type Users = {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  favorites_movies: cinemaData[];
};

export type Review = {
  movies_data_id: number;
  user_id: number;
  review: string;
  rating: number;
};

export type ReviewWithUser = {
  movies_data_id: number;
  movie_name: string;
  review: string;
  rating: number;
  user: Users;
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
