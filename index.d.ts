import type Keycloak from "keycloak-js";

declare module "#app" {
  interface NuxtApp {
    $keycloak: Keycloak;
  }
}
