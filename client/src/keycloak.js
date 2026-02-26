import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8085',
  realm: 'football-realme',
  clientId: 'match-client',
});

export default keycloak;
