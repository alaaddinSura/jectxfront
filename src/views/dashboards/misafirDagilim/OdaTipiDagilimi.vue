<script setup>
import { store } from "@/store/index"
import Loader from "../functions/loader.vue"

const isEmptyRoomData = computed(() => {
  return monthlyCampaignState.value.every(state => !state.title)
})

const monthlyCampaignState = computed(()=>{
  let chosenHotels = store.state.selectedHotels
  let rezData = store.state.odaTipiDagilim == 0 ? JSON.parse(localStorage.getItem("odaTipiDagilim")) : store.state.odaTipiDagilim
  let statData = rezData.filter(item=> chosenHotels.includes(item.hotelId))
  let roomsName = [...new Set(statData.map(item=> item.roomType))]
  let gecelemeHepsi = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)
  let roomData = roomsName.map(item =>({
    roomName: item,
    geceleme: statData.filter(i => i.roomType == item).map(k=> k.count != 'nan' ? Number(k.count): 0).reduce((f,s)=>f+s,0),
    oran: Math.round((statData.filter(k=> k.roomType == item).map(k=> k.count != 'nan' ? Number(k.count):0).reduce((f,s)=>f+s,0)/ gecelemeHepsi)*1000) / 10,
  }))

  roomData = roomData.sort((a, b) => b.geceleme - a.geceleme)
  let maxRoomCount = roomData.length >= 6 ? 6 : roomData.length
  roomData = roomData.slice(0, maxRoomCount)
  roomData = roomData.map(item => ({
    
      avatarColor: 'success',
      avatarIcon: 'tabler-hotel-service',
      title: item?.roomName,
      count: item?.geceleme,
      stats: item?.oran + "%",
      statsColor: 'success',
    
  }))

  return roomData
})
</script>

<template>
  <VCard title="Oda Tipi Dağılımı">
    <VCardText>
      <VList class="card-list">
        <VListItem v-if="!isEmptyRoomData"
          v-for="state in monthlyCampaignState"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar
              :color="state.avatarColor"
              variant="tonal"
              size="34"
              rounded
            >
              <VIcon :icon="state.avatarIcon" />
            </VAvatar>
          </template>
          <VListItemTitle class="font-weight-medium" v-if="store.state.odaTipiDagilimLoader == 1">
            {{ state.title }}
          </VListItemTitle>
          <VListItemTitle class="font-weight-medium" v-if="store.state.odaTipiDagilimLoader == 0">
            <Loader />
          </VListItemTitle>
          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3" v-if="store.state.odaTipiDagilimLoader == 1">
              {{ state.count }}
              <span :class="`text-${state.statsColor}`">{{ state.stats }}</span>
            </span>
            <span class="font-weight-medium text-medium-emphasis me-3" v-if="store.state.odaTipiDagilimLoader == 0">
              <Loader />
            </span>
          </template>
        </VListItem>
        <VListItem v-else  v-for="state in monthlyCampaignState">
          <template #prepend>
            <VAvatar
              :color="state.avatarColor"
              variant="tonal"
              size="34"
              rounded
            >
              <VIcon :icon="state.avatarIcon" />
            </VAvatar>
          </template>
          <Loader />
          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3">
              <Loader />
            </span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list{
    --v-card-list-gap: 26px;
}
</style>