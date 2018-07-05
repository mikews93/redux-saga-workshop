import dotenv from 'dotenv';
import { isEnabled as featureToggleIsEnabled } from '../../featureToggles';
dotenv.config();

const { REACT_APP_TOKEN_NAME, REACT_APP_REFRESH_TOKEN_NAME } = process.env;

const saveToken = token => {
  localStorage.setItem(REACT_APP_TOKEN_NAME, token.access_token);
  localStorage.setItem(REACT_APP_REFRESH_TOKEN_NAME, token.refresh_token);
};

const removeToken = () => localStorage.clear();

const getToken = () =>
  featureToggleIsEnabled('ec_dev_token')
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MjM5MjYiLCJ1c2VyTmFtZSI6IkVTU0VOVElBIiwiZW1haWwiOiJQSlNZU1RFTUBHTUFJTC5DT00iLCJmdWxsTmFtZSI6Ik5JQ09MRSBKT0hOU09OIiwiZW1wbG95ZXJJZCI6IjM3MiIsInNjb3BlIjoiQURNSU4iLCJpc3MiOiJodHRwczovL2F1dGgudGVzdC5ldmVyY2hlY2suY29tIiwiYXBwbGljYXRpb25zIjp7Imh1bWFuUmVzb3VyY2VzIjp0cnVlLCJlZHVjYXRpb24iOnRydWUsImNyZWRlbnRpYWxpbmciOnRydWUsInByZWhpcmUiOmZhbHNlfSwiYXVkIjpbIkV2ZXJjaGVjay1PbmUiLCJ3YWxsZXQiXSwiaWRUdlVzZXIiOiIxMzgxNmJmOC0zMmNiLTQ4YjUtOTk1OC1kMzQ1NzhmMDk0YzMiLCJ0dkFjY2Vzc1Rva2VuIjoiLmVKd2x5MDBLd2pBUVFPRzdaS3NETTVPX1NXN2czbjFwMGhTTHRJcE53U3JlM2FEYnhfZmVxazV6V1dzXzMxVlVqQ1NBRmppY0tVUnkwWVlEWWtSVXg1X3JybVZ2YkstWFpUazl3X1JxZlZ2TG81dUdsa2tMdVRRS2FNNEpqQ1FMSVZpQlFSdnJaY1Jnc201RG5fTnRXLXJfMGRtYlZBeURkMXphUXhsU1k1Q0p2V2htR2gycHp4YzJkUzJLLkRlODRxdy5rSElTOXhWbjY5R2dtUzNBQXFKNTJENXZpYUEiLCJqdGkiOiJjYzYzNWUwMy0zYWJlLTRkMTQtOTQ3Yi1mMjI5MWVjZjE1NjAiLCJpYXQiOjE1Mjc2MjE0MTYsImV4cCI6MTUyODgzMTAxNn0.oxRq2QpNaHYAw2z_nnv4gaf6Wu7J5fpYBkCgV1T_MNs'
    : localStorage.getItem(REACT_APP_TOKEN_NAME);

const getUserInfo = () => {
  const token = getToken();
  if (token && token.split('.').length === 3) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('-', '/');
    return JSON.parse(window.atob(base64));
  }
};

export { saveToken, removeToken, getToken, getUserInfo };
