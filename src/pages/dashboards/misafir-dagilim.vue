<script setup>
import OdaTipiDagilim from "@/views/dashboards/misafirDagilim/OdaTipiDagilimi.vue"
import UlkeDagilim from "@/views/dashboards/misafirDagilim/UlkeDagilim.vue"
import YatakDagilim from "@/views/dashboards/misafirDagilim/YatakDagilim.vue"
import GecelemeDagilim from "@/views/dashboards/misafirDagilim/gecelemeDagilim.vue"

</script>

<template>
  <VRow class="match-height">
    <!-- Kişi Sayısına Göre Yatak Dağılımı -->
    <VCol
      cols="12"
      md="7"
      lg="6"
    >
      <YatakDagilim class="h-100" />
    </VCol>
    <!-- Geceleme Sayısına Göre Dağılım -->
    <VCol
      cols="12"
      md="7"
      lg="6"
    >
      <GecelemeDagilim class="h-100" />
    </VCol>
    <!-- Ülke Dağılımı -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <UlkeDagilim class="h-100" />
    </VCol>
    <!-- Oda Tipi Dağılımı -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <OdaTipiDagilim />
    </VCol>
  </VRow>
</template>