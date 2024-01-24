<script setup>
import AyDoluluk from "@/views/dashboards/rezervasyonAnaliz/AyDoluluk.vue"
import AyasofyaDoluluk from "@/views/dashboards/rezervasyonAnaliz/AyasofyaDoluluk.vue"
import GecmisRezervasyonlar from "@/views/dashboards/rezervasyonAnaliz/GecmisRezervasyonlar.vue"
import GenelRezerv from "@/views/dashboards/rezervasyonAnaliz/GenelRezerv.vue"
import HaftaDoluluk from "@/views/dashboards/rezervasyonAnaliz/HaftaDoluluk.vue"
import KanalDagilimi from "@/views/dashboards/rezervasyonAnaliz/KanalDagilimi.vue"
import OnlineRezerv from "@/views/dashboards/rezervasyonAnaliz/OnlineRezerv.vue"
import RezervTablo from "@/views/dashboards/rezervasyonAnaliz/RezervTablo.vue"
import YediAyDoluluk from "@/views/dashboards/rezervasyonAnaliz/YediAyDoluluk.vue"
</script>

<template>
  <VRow>
    <!-- Rezervasyon Raporu -->
    <VCol
      cols="12"
      lg="4"
      md="4"
    >
      <GenelRezerv />
    </VCol>

    <!-- Kanal Dağılımı -->
    <VCol
      cols="12"
      md="8"
      lg="8"
    >
      <KanalDagilimi class="h-100" />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <OnlineRezerv />
    </VCol>
    <VCol
      cols="12"
      md="6"
      lg="2"
    >
      <AyasofyaDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="6"
      lg="2"
    >
      <HaftaDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="6"
      lg="2"
    >
      <AyDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="6"
      lg="2"
    >
      <YediAyDoluluk />
    </VCol>
    <!-- 12 Aylık ay bazında -->
    <VCol
      cols="12"
      lg="12"
    >
      <GecmisRezervasyonlar />
    </VCol>
    <!-- Rezerv Tablo -->
    <VCol
      cols="12"
      lg="12"
    >
      <RezervTablo />
    </VCol>
    <!-- Raw Tablo -->
    <VCol
      cols="12"
      lg="12"
    >
      <!-- <RawTablo /> --> 
    </VCol>
  </VRow>
</template>