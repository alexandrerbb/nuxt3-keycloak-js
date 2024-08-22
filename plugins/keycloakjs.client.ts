/**
 * Keycloak.js support for Nuxt.
 * 
 * Note that this plugin should only work at the client side.
 */

import Keycloak from "keycloak-js";
import { omit } from "remeda";

// Query parameters used by Keycloak.
const KEYCLOAK_PARAMS = [
  "state",
  "session_state",
  "code",
]

const plugin = defineNuxtPlugin({
  name: "keycloakjs",
  enforce: "pre",
  hooks: {
    // This hook fixes https://github.com/keycloak/keycloak/issues/14742
    "app:mounted"() {
      const router = useRouter();

      // Filter query parameters. Remove query parameters used by Keycloak.
      // (you can use you own logic here)
      const query = omit(router.currentRoute.value.query, KEYCLOAK_PARAMS);
      router.replace({ query });
    },
  },
  async setup() {
    const config = useRuntimeConfig();
    try {
      const keycloak = new Keycloak({
        url: config.public.keycloakUrl,
        realm: config.public.keycloakRealm,
        clientId: config.public.keycloakClientId,
      });
      await keycloak.init({
        onLoad: "check-sso",
        // Optional
        silentCheckSsoRedirectUri: location.origin + "/silent-check-sso.html",
        responseMode: "query",
      });

      return {
        provide: {
          keycloak,
        },
      };
    } catch (e) {
      console.error(e)
      throw createError({ statusCode: 401, message: "Keycloak error" });
    }
  },
});

export default plugin;