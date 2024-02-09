import Keycloak from "keycloak-js";
import { omit } from "remeda";

export default defineNuxtPlugin({
  name: "keycloak-init",
  enforce: "pre",
  hooks: {
    /**
     * Fix router issue, see : https://github.com/keycloak/keycloak/issues/14742
     */
    "app:created"() {
      
      const router = useRouter();
      // Here i'm using remeda, you can use you own logic.
      const query = omit(router.currentRoute.value.query, [
        "state",
        "session_state",
        "code",
      ]);
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
        silentCheckSsoRedirectUri: useRelativeRoute("silent-check-sso.html"),
        responseMode: "query",
      });
      return {
        provide: {
          keycloak,
        },
      };
    } catch (e) {
      console.log(e)
      throw createError({});
    }
  },
});
