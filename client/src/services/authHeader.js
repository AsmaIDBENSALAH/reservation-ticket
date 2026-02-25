import keycloak from '../keycloak';

export const getAuthHeader = () => {
  const token = keycloak.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};
