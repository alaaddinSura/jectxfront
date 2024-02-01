<script setup>
import { store } from "@/store/index"

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

  roomData = roomData.slice(0, 6)

  console.log(roomData[0].geceleme)
  return [
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[0].roomName,
    count: roomData[0].geceleme,
    stats: roomData[0].oran + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[1].roomName,
    count: roomData[1].geceleme,
    stats: roomData[1].oran + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[2].roomName,
    count: roomData[2].geceleme,
    stats: roomData[2].oran + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[3].roomName,
    count: roomData[3].geceleme,
    stats: roomData[3].oran + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'secondary',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[4].roomName,
    count: roomData[4].geceleme,
    stats: roomData[4].oran + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-hotel-service',
    title: roomData[5].roomName,
    count: roomData[5].geceleme,
    stats: roomData[5].oran + "%",
    statsColor: 'success',
  },
]
})
</script>

<template>
  <VCard title="Oda Tipi Dağılımı">
    <VCardText>
      <VList class="card-list">
        <VListItem
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
          <VListItemTitle class="font-weight-medium">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3">
              {{ state.count }}
              <span :class="`text-${state.statsColor}`">{{ state.stats }}</span>
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