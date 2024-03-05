<script setup>
import GecmisRezervasyonlar from "@/views/dashboards/rezervasyonDagilim/GecmisRezervasyonlar.vue"
import GelecekRezervasyonlar from "@/views/dashboards/rezervasyonDagilim/GelecekRezervasyonlar.vue"
import IptalAnaliz from "@/views/dashboards/rezervasyonDagilim/IptalAnaliz.vue"
import IptalEdebilirAnaliz from "@/views/dashboards/rezervasyonDagilim/IptalEdebilirAnaliz.vue"
import RezAnaliz from "@/views/dashboards/rezervasyonDagilim/RezAnaliz.vue"
</script>

<template>
  <VRow>
    <!-- Rezervasyon Analiz -->
    <VCol
      cols="12"
      md="6"
      lg="6"
    >
      <RezAnaliz class="h-100" />
    </VCol>
    <!-- İptal Analiz -->
    <VCol
      cols="12"
      md="6"
      lg="6"
    >
      <IptalAnaliz class="h-100" />
    </VCol>
    <!-- iptal Edilebilir Analiz -->
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <IptalEdebilirAnaliz  />
    </VCol>
    <!-- 12 Aylık Bazında Geçmiş Rezervasyonlar -->
    <VCol
      cols="12"
      lg="8"
      md="7"
    >
      <GecmisRezervasyonlar class="h-100" />
    </VCol>
    <!-- ilk 30 gün (Normal Rezervasyon Analiz sayfasında olanı getirmek ve oradikini iptal etmek daha mantıklı duruyor) -->
    <VCol
      cols="12"
      lg="12"
    >
      <GelecekRezervasyonlar />
    </VCol>
  </VRow>
</template>