/**
 * Middleware for protected pages.
 */
export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return;
  const { $keycloak } = useNuxtApp();
  if (!$keycloak.authenticated) {
    return $keycloak.login();
  }
});
