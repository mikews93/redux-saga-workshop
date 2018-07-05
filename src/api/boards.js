import { educationApiInstance } from './';
import { getToken } from '../utils/auth/jwt';

export const fetchBoards = () =>
  educationApiInstance.get('/boards', {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
