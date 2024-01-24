<script setup lang="ts">
const { $keycloak } = useNuxtApp();
const logout = () => $keycloak.logout({ redirectUri: useRelativeRoute("") });
</script>

<template>
  <div>
    <button @click="logout" v-if="$keycloak.authenticated">Logout</button>
    <button @click="$keycloak.login" v-else>Login</button>
  </div>
</template>
