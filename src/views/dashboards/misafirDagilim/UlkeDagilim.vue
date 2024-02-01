<script setup>
import { store } from '@/store/index'
import * as countryName from '@/views/dashboards/functions/countries'



const salesByCountries = computed(()=>{
  let chosenHotels = store.state.selectedHotels

  let nationData = store.state.guestNations
  let rezData = store.state.ulkeDagilim == 0 ? JSON.parse(localStorage.getItem("countryDist")) : store.state.ulkeDagilim

  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId) && item.nationality !== 'Tanımsız')

  let countries = [...new Set(statData.map(item => item.nationality))]

  let countries_dist = countries.map(item => ({
    adet: statData.filter(j => j.nationality === item).map(i => i.count != 'nan' ? Number(i.count): 0).reduce((f,s)=>f+s,0),
    geceleme: statData.filter(j => j.nationality === item).map(i => i.night != 'nan' ? Number(i.night): 0).reduce((f,s)=>f+s,0),
    gelir: statData.filter(j=> j.nationality === item).map(i => i.adr != 'nan' ? Number(i.adr):0).reduce((f,s)=>f+s,0), country: item, adetOran: statData.filter(i=> i.nationality === item).map(j => j.count != 'nan' ? Number(j.count): 0).reduce((f,s)=>f+s,0)/statData.map(k=> k.count != 'nan' ? Number(k.count): 0).reduce((f,s)=>f+s,0)
  }))

  let country_dist_paroti = []
  let index = 0

  country_dist_paroti = countries_dist.sort((a, b) => b.adetOran - a.adetOran).map(item => ({
    flag: "flag-" + countryName.findCountry2Letter(item.country) + "-1x1",
    rezAdet: item.adet,
    ulke: item.country,
    adr: Number((item.gelir/item.geceleme).toFixed(1)),
    geceleme: item.geceleme,
    oran: Number((item.geceleme/item.adet).toFixed(1)),
  }))

  country_dist_paroti = country_dist_paroti.slice(0, 5)

  return country_dist_paroti
})
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

<style lang="scss" scoped>
.card-list{
  --v-card-list-gap: 19px;
}
</style>