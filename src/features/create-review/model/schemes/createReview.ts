export type CreateReviewPayload = {
  movies_data_id: number;
  review: string;
  rating: number;
  movie_name: string;
};

export type CreateReviewParams = CreateReviewPayload & {
  user_id: number;
};
