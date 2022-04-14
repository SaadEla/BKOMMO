import Keycloak from "keycloak-js";
import { getApiCall, urlencodedApiCall } from "../helpers/apiCall";
import API_URL from "../config/api/API_URL";

/**
 * Charger le fichier de configuration public/keycloak.json
 * @type {Keycloak.KeycloakInstance}
 * @private
 */
const _kc = new Keycloak("keycloak.json");

let connectedDBUser = null;
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback, renderFoorZeroFoor) => {
  /**
   * Initialiser keycloak avec la propertie :
   * onLoad: login-required pour forcer l'authentification pour voir les composants
   */
  _kc
    .init({
      onLoad: "login-required",
      checkLoginIframe: false,
    })
    .then((authenticated) => {
      if (authenticated) {
        if (_kc.hasRealmRole("bkomo-manager")) {
          urlencodedApiCall(
            API_URL.SERVER_BASE_URL.concat(API_URL.USER_DETAIL),
            {
              login: _kc.tokenParsed.preferred_username,
            }
          )
            .then((data) => {
              // logged user id
              // todo userId = data.id
              console.log("mydata", data.data.roles);
              if (data.data && data.data.connect == 1) {
                connectedDBUser = data.data;
                onAuthenticatedCallback();
              } else renderFoorZeroFoor();
            })
            .catch((err) => {
              renderFoorZeroFoor();
              return;
            });
          // onAuthenticatedCallback();
        } else {
          renderFoorZeroFoor();
          return;
        }
      } else {
        console.warn("not authenticated!");
        //  doLogin();
      }
    });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const updateToken = (successCallback) => {
  return _kc.updateToken(5).then(successCallback).catch(doLogin);
};

const getUsername = () => _kc.tokenParsed.name;
const getLoginName = () => _kc.tokenParsed.preferred_username;
const getAccountUrl = () => _kc.createAccountUrl();
const getConnectedDBUser = () => connectedDBUser;
const getUserId = () => {
  if (connectedDBUser && connectedDBUser.user)
    return connectedDBUser.user.utilisateurId;
};
const getRoles = () => {
  if (connectedDBUser && connectedDBUser.roles) return connectedDBUser.roles;
  else return [];
};
const hasRole = (role) => {
  return getRoles().filter((roleItem) => roleItem == role).length > 0;
};
export default {
  initKeycloak,
  doLogin,
  doLogout,
  getToken,
  updateToken,
  getUsername,
  getAccountUrl,
  getLoginName,
  getConnectedDBUser,
  getUserId,
  hasRole,
};
