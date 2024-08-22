/**
 * Middleware that requires the user to be authenticated.
 */
export default defineNuxtRouteMiddleware(async () => {
  // Only run on client side.
  if (import.meta.server)
    return;
  const { $keycloak } = useNuxtApp();
  console.log($keycloak)
  if (!$keycloak.authenticated) {
    await $keycloak.login();
    // If the user is not redirected by `Keycloak.login`
    // This shouldn't happen.
    return abortNavigation("You must be authenticated to view this page.");
  }
});
