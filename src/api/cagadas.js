import {
  educationApiInstance
} from './';
import {
  getToken
} from '../utils/auth/jwt';

export const fetchCagadas = () => {
  return {
    data: [{
      id: 1667,
      author: 'test',
      date: '',
      desciption: '',
      meme: '',
      video: '',
      from: '',
      to: '',
      rank: '',
      reactions: ''
    }]
  }
};
// educationApiInstance.get('/boards', {
//   headers: {
//     authorization: `Bearer ${getToken()}`
//   }
// });