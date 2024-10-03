const auth = 'auth';
const users = 'users';
const messages = 'messages';
const profile = 'profile';

const baseUrl = 'http://localhost:3000/api';

export const ApiUrl = {
  login: `${baseUrl}/${auth}/login`,
  signup: `${baseUrl}/${auth}/signup`,
  logout: `${baseUrl}/${auth}/logout`,
  users: `${baseUrl}/${users}`,
  userProfile: `${baseUrl}/${users}/${profile}`,
  messages: `${baseUrl}/${messages}`,
};
