<script setup>
import { store } from '@/store/index'
import { ref, watch } from 'vue'

let ayasofyaSelected = ref(true)
let designSelected = ref(true)


watch([ayasofyaSelected, designSelected], ([new_1, old_1], [new_2, old_2])=>{
  if((ayasofyaSelected.value && designSelected.value)){
    store.commit('changeSelectedHotels', [22964, 22966])

  }
  if((ayasofyaSelected.value && !designSelected.value)){
    store.commit('changeSelectedHotels', [22964])
  }
  if((!ayasofyaSelected.value && designSelected.value)){
    store.commit('changeSelectedHotels', [22966])
  }
  if((!ayasofyaSelected.value && !designSelected.value)){
    store.commit('changeSelectedHotels', ['No Hotel'])
  }
})
</script>

<template>
  <VMenu
    :close-on-content-click="false"
    offset-y class="margin"
  >
    <template #activator="{props}">
      <IconBtn v-bind="props">
        <VIcon icon="tabler-home" />
      </IconBtn>
    </template>
    <VCard width="300">
      <VCardText>
        <VCheckbox
          key="ayasofya"
          v-model="ayasofyaSelected"
          label="Ayasofya"
        />
        <VCheckbox
          key="design"
          v-model="designSelected"
          label="Design"
        />
      </VCardText>
    </VCard>
  </VMenu>
</template>