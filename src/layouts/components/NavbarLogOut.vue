<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logOut = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userAbilities')
  router.replace('/')
}
</script>

<template>
  <IconBtn @click="logOut">
    <VIcon icon="tabler-logout" />
  </IconBtn>
</template>
