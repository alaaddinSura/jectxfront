<script setup>
import * as adminFetchData from "@/views/admin/functions/adminFetchData";
import { store } from "@/store/index";
const isDialogVisible = ref(false);

let tableData = computed(() => {
  let channelData = store.state.getGoals.length == 0 ? JSON.parse(localStorage.getItem("getGoals")) : store.state.getGoals
  return channelData;
});


const formEntries = ref([{ target: "", date: "", otel: "" }]);

const isSaveButtonActive = computed(() => {
  const tableDataValue = tableData.value.map(item=> item.value)
  const tableDataDate = tableData.value.map(item=> item.date)
  const tableDataHotelId = tableData.value.map(item=> item.hotelId)

  for (const entry of formEntries.value) {
    if (entry.target.length === 0 || entry.date.length === 0 || entry.otel.length === 0){
      
      return false;
    }
    // Girişin otel değeri tableDataValue içinde var mı kontrol et
    const entryOtelExists = entry.otel === "Ayasofya" ? 22964 : 22966
    const otelExists = tableDataValue.includes(parseInt(entry.target));
    const dateExists = tableDataDate.includes(entry.date);
    const hotelExits = tableDataHotelId.includes(entryOtelExists)

    if (dateExists && hotelExits) {
      return false;
    }
  }
  return true;
});

const addNewEntry = () => {
  formEntries.value.push({ target: "", date: "", otel: "" });
  
};

const addUser = () => {
  for (const entry of formEntries.value) {
    adminFetchData.addGoals(parseInt(entry.target), entry.date, entry.otel === "Ayasofya" ? 22966 : 22964)
  }
  isDialogVisible.value = false;
};

const removeEntry = (index) => {
  if (formEntries.value.length > 1) {
    formEntries.value.splice(index, 1);
  }
};

const resetDialog = () => {
  formEntries.value = [{ target: "", date: "", otel: "" }];
  isDialogVisible.value = false;
};
</script>

<template>
  <VDialog v-model="isDialogVisible" max-width="600">
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VIcon
        :icon="'tabler-circle-plus'"
        size="34"
        :color="'success'"
        class="me-1"
        @click="isDialogVisible = true"
        v-bind="props"
      />
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Yeni Aylık Hedef Ekle">
      <VCardText>
        <VRow
          v-for="(entry, index) in formEntries"
          :key="index"
          class="mb-10"
          :style="{
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
            padding: '5px',
            borderRadius: '10px',
          }"
        >
          <VCol cols="12">
            <p>Yeni Aylık Hedef</p>
          </VCol>
          <VCol cols="12" sm="12">
            <VAutocomplete
              v-model="entry.otel"
              :items="['Ayasofya', 'Design']"
              label="Otel"
              :disable-filter="true"
              @keydown.prevent
            />
          </VCol>
          <VCol cols="12" sm="12">
            <VTextField
              v-model="entry.date"
              label="Tarih"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="entry.target"
              label="Hedef"
              type="number"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VIcon
          :icon="'tabler-circle-plus'"
          size="34"
          :color="'success'"
          class="me-1"
          @click="addNewEntry"
        />
        <VIcon
          :icon="'tabler-circle-minus'"
          size="34"
          :color="'error'"
          class="me-1"
          @click="removeEntry"
        />
        <VSpacer />
        <VBtn variant="tonal" color="secondary" @click="resetDialog">
          Kapat
        </VBtn>
        <VBtn @click="addUser" :disabled="!isSaveButtonActive"> Ekle </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
