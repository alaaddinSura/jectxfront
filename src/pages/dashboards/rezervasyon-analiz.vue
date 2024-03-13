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
import RezAnaliz from "@/views/dashboards/rezervasyonAnaliz/RezAnaliz.vue"
import IptalAnaliz from "@/views/dashboards/rezervasyonAnaliz/IptalAnaliz.vue"

</script>

<template>
  <VRow>
    <!-- Rezervasyon Raporu -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <GenelRezerv />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="8"
    >
      <KanalDagilimi/>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <OnlineRezerv />
    </VCol>
    <!-- Kanal Dağılımı -->
    
    <VCol
      cols="12"
      md="2"
      lg="2"
    >
      <Doluluk />
    </VCol>
    <VCol
      cols="12"
      md="2"
      lg="2"
    >
      <HaftaDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="2"
      lg="2"
    >
      <AyDoluluk />
    </VCol>
    <VCol
      cols="12"
      md="2"
      lg="2"
    >
      <YediAyDoluluk />
    </VCol>
    <VCol cols="12" md="6">
      <RezAnaliz />
    </VCol>
    <VCol cols="12" md="6">
      <IptalAnaliz />
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