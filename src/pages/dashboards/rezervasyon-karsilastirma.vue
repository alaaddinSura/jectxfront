<script setup>
import NormalRezervasyonKarsilastirma from "@/views/dashboards/rezervasyonKarsilastirma/NormalRezervasyonKarsilastirma.vue"
import OnlineRezervasyonKarsilastirma from "@/views/dashboards/rezervasyonKarsilastirma/OnlineRezervasyonKarsilastirma.vue"
</script>

<template>
  <VRow>
    <VCol cols="12">
      <NormalRezervasyonKarsilastirma />
    </VCol>
    <VCol cols="12">
      <OnlineRezervasyonKarsilastirma />
    </VCol>
  </VRow>
</template>