<script setup>
import GunlukTakip from "@/views/dashboards/rezervasyonGelir/GunlukTakip.vue"
import KanalDagilimGelirler from "@/views/dashboards/rezervasyonGelir/KanalDagilimGelirler.vue"
import KazancDurumu from "@/views/dashboards/rezervasyonGelir/KazancDurumu.vue"
</script>

<template>
  <VRow>
    <!-- Aylık Kazanç Takip -->
    <VCol
      cols="12"
      lg="6"
      md="6"
    >
      <KazancDurumu class="h-100" />
    </VCol>
    <!-- Günlük Kazanç Takip -->
    <VCol
      cols="12"
      lg="6"
      md="6"
    >
      <GunlukTakip class="h-100" />
    </VCol>
    <!-- Kanal Dağılım Gelirler -->
    <VCol
      cols="12"
      lg="12"
      md="12"
    >
      <KanalDagilimGelirler />
    </VCol>
  </VRow>
</template>