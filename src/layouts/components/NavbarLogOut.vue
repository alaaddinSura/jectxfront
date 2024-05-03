<script setup>
import { useRouter } from 'vue-router'
import { store } from "@/store/index";

const router = useRouter()

const logOut = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userAbilities')
  store.commit("changesonYediAyDoluluk", [])

  //localStorage.clear();
  router.replace('/')
}
</script>

<template>
  <IconBtn @click="logOut">
    <VIcon icon="tabler-logout" />
  </IconBtn>
</template>
