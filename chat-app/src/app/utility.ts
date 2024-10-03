export const getAuthToken = () => {
  const authToken = localStorage.getItem('authToken') ?? '';
  return authToken;
};
