<script setup>
import * as fetchData from "@/views/dashboards/functions/fetchData";
import EditGoalsConfirmation from "./EditGoalsConfirmation.vue"
import { store } from "@/store/index";

const isDialogVisible = ref(false)
const email = ref('asd')
const pages = ref([])
const role = ref('')

const props = defineProps({
    id: String
})

const updateId = computed(()=>{
  return props.id;
})



const formEntries = ref([{ target: '', date: '', hotels: '' }]);

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (entry.target.length === 0 || entry.date.length === 0 || entry.hotels.length === 0) {
      return false;
    }
  }
  return true;
});

const exitModal = (updateId) =>{
  formEntries.value = ([{ target: '', date: '', hotels: '' }]);
  isDialogVisible.value = false
  console.log("updateId ==> ", updateId)
}
</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
       <VIcon
            :icon="'tabler-edit'"
            size="26"
            class="me-1"
            @click="isDialogVisible = true"
            v-bind="props"
            />
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Aylık Hedef Güncelle">
      <VCardText>
        <VRow class="mb-3" v-for="(entry, index) in formEntries" :key="index">
            <VCol cols="12">
              <VTextField
              v-model="entry.target"
                label="Hedef"
                type="number"
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
            <VTextField
            v-model="entry.date"
              label="Tarih"
            />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VAutocomplete
                v-model="entry.hotels"
                :items="['Ayasofya','Design']"
                label="Otel"
              />
            </VCol> 
          </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="exitModal()"
        >
          Kapat
        </VBtn>
        <VBtn :disabled="!isSaveButtonActive" width="120px">
          <template v-for="(entry, index) in formEntries" :key="index">
            <EditGoalsConfirmation :target="entry.target" :date="entry.date" :hotels="entry.hotels" :id="updateId"/>
          </template>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>