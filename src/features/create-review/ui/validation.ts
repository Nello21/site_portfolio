import { object, string } from 'yup';

export const reviewScheme = object().shape({
  rating: string().min(0, 'оценка не может быть меньше нуля').max(10, 'оценка не может быть больше десяти'),
});
