import { post } from 'services/transport';
import { CreateReviewParams } from '../schemes/createReview';

export const createCommentApi = {
  createComment: (data: CreateReviewParams) => post('/reviews', data),
};
