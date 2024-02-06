<script setup>
import AyDoluluk from "@/views/dashboards/rezervasyonAnaliz/AyDoluluk.vue"
import Doluluk from "@/views/dashboards/rezervasyonAnaliz/Doluluk.vue"
import GecmisRezervasyonlar from "@/views/dashboards/rezervasyonAnaliz/GecmisRezervasyonlar.vue"
import GenelRezerv from "@/views/dashboards/rezervasyonAnaliz/GenelRezerv.vue"
import HaftaDoluluk from "@/views/dashboards/rezervasyonAnaliz/HaftaDoluluk.vue"
import KanalDagilimi from "@/views/dashboards/rezervasyonAnaliz/KanalDagilimi.vue"
import OnlineRezerv from "@/views/dashboards/rezervasyonAnaliz/OnlineRezerv.vue"
import RezervTablo from "@/views/dashboards/rezervasyonAnaliz/RezervTablo.vue"
import YediAyDoluluk from "@/views/dashboards/rezervasyonAnaliz/YediAyDoluluk.vue"
import RawTablo from "@/views/dashboards/rezervasyonAnaliz/RawTablo.vue"
</script>

<template>
  <VRow>
    <!-- Rezervasyon Raporu -->
    <VCol
      cols="12"
      lg="6"
      md="5"
    >
      <GenelRezerv />
    </VCol>

    <!-- Kanal Dağılımı -->
    <VCol
      cols="12"
      md="7"
      lg="6"
    >
      <KanalDagilimi class="h-100"/>
    </VCol>

    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <OnlineRezerv />
    </VCol>
    <VCol
      cols="12"
      md="3"
      lg="2"
    >
      <Doluluk />
    </VCol>
    <VCol
      cols="12"
      md="3"
      lg="2"
    >
      <HaftaDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="3"
      lg="2"
    >
      <AyDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="3"
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
      <RawTablo/>
    </VCol>
  </VRow>
</template>