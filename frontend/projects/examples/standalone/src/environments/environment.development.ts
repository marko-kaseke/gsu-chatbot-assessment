export const environment = {
  production: false,

  keycloak: {
    realm: 'gsu-realm',
    url: 'http://localhost:8080',
    clientId: 'smartassist-frontend-client'
  },

  api: {
    baseUrl: 'http://localhost:8081/api'
  },

  interceptor: {
    urlPattern: /^(http:\/\/(localhost|backend):8081)(\/.*)?$/i
  }
};