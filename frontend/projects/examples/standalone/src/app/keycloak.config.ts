import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService
} from 'keycloak-angular';
import { environment } from '../environments/environment';

//localhostCondition
/*const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8081)(\/.*)?$/i
});*/

//backendCondition ----------------
const backendCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: environment.interceptor.urlPattern
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    /*config: {
      realm: 'gsu-realm',
      url: 'http://localhost:8080', //local dev only
      clientId: 'smartassist-frontend-client'
    },*/
	config: {
		realm: environment.keycloak.realm,
		url: environment.keycloak.url,
		clientId: environment.keycloak.clientId
	},
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        //useValue: [localhostCondition]
		useValue: [backendCondition]   // <--- critical fix for dockerized app
      }
    ]
  });
