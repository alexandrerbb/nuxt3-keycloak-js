<script setup lang="ts">
const { $keycloak } = useNuxtApp();

const login = () => {
  $keycloak.login()
}

const logout = () => {
  $keycloak.logout({ redirectUri: location.origin + "/" });
}

</script>

<template>
  <div>
    <button @click="logout" v-if="$keycloak.authenticated">Logout</button>
    <button @click="login" v-else>Login</button>
  </div>
</template>
