// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  runtimeConfig: {
    public: {
      keycloakUrl: "http://localhost:8080/auth",
      keycloakRealm: "my-realm",
      keycloakClientId: "app",
    },
  },

  compatibilityDate: "2024-08-22",
})