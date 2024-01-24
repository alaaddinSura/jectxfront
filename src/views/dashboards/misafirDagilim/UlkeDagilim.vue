<script setup>
import { store } from '@/store/index'

let nationData = store.state.guestNations

const salesByCountries = [
  {
    flag: "flag-tr-1x1",
    rezAdet: 116,
    ulke: "TUR",
    geceleme: 227,
    oran: 2,
    adr: 101.9,
  },
  {
    flag: "flag-gb-1x1",
    rezAdet: 66,
    ulke: "GBR",
    geceleme: 217,
    oran: 3.3,
    adr: 108.4,
  },
  {
    flag: "flag-fr-1x1",
    rezAdet: 23,
    ulke: "FRA",
    geceleme: 66,
    oran: 2.9,
    adr: 93.7,
  },
  {
    flag: "flag-ru-1x1",
    rezAdet: 22,
    ulke: "RUS",
    geceleme: 88,
    oran: 4,
    adr: 108,
  },
  {
    flag: "flag-de-1x1",
    rezAdet: 14,
    ulke: "DEU",
    geceleme: 49,
    oran: 3.5,
    adr: 91.7,
  },
]
</script>

<template>
  <VCard title="Ülkelere Göre Dağılım">
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="country in salesByCountries"
          :key="country.rezAdet"
        >
          <template #prepend>
            <VIcon
              :icon="country.flag"
              size="34"
            />
          </template>
          <VListItemTitle class="font-weight-medium">
            {{ country.rezAdet }}
          </VListItemTitle>
          <VListItemTitle class="text-disabled">
            {{ country.ulke }}
          </VListItemTitle>

          <template #append>
            <VCol><span> {{ country.geceleme }}</span></VCol>
            <VCol><span> {{ country.oran }}</span></VCol>
            <VCol><span> {{ Math.abs(country.adr) }}</span></VCol>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
