<script setup>
const props = defineProps({
  data: Array,
  title: String,
  subtitle: Boolean,
})

const statistic = computed(()=> {return props.data})

const text = computed(()=>props.subtitle ? "Toplam Miktar " + String(props.data.map(item=>item.stats).reduce((f, s)=>f+s, 0)): "")
</script>

<template>
  <VCard :title="props.title">
    <template #append>
      <span class="text-sm text-disabled">{{ text }}</span>
    </template>
    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistic"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex align-center gap-4">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
            >
              <VIcon :icon="item.icon" />
            </VAvatar>
            <div class="d-flex flex-column">
              <span class="text-h5 font-weight-medium">{{ item.stats }}</span>
              <span class="text-sm">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>