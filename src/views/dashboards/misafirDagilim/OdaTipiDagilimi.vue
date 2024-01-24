<script setup>
const monthlyCampaignState = [
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: "STD-DBL",
    count: 393,
    stats: 34.4 + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: "DDXARTW",
    count: 122,
    stats: 10.7 + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: "CLS-DBL",
    count: 114,
    stats: 10 + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-hotel-service',
    title: "STD-TRP",
    count: 62,
    stats: 5.4 + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'secondary',
    avatarIcon: 'tabler-hotel-service',
    title: "CLS-TWN",
    count: 110,
    stats: 9.6 + "%",
    statsColor: 'success',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-hotel-service',
    title: "STD-TWN",
    count: 65,
    stats: 5.7 + "%",
    statsColor: 'success',
  },
]
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