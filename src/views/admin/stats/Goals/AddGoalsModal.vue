<script setup>
import * as adminFetchData from "@/views/admin/functions/adminFetchData";

const isDialogVisible = ref(false);



const formEntries = ref([{ target: "", date: "", otel: "" }]);

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (entry.target.length === 0 || entry.date.length === 0 || entry.otel.length === 0){
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
          <VCol cols="12">
            <VTextField
              v-model="entry.target"
              label="Hedef"
              type="number"
            />
          </VCol>
          <VCol cols="12" sm="12">
            <VTextField
              v-model="entry.date"
              label="Tarih"
            />
          </VCol>
          <VCol cols="12" sm="12">
            <VAutocomplete
              v-model="entry.otel"
              :items="['Ayasofya', 'Design']"
              label="Otel"
              clearable
              hide-details
              no-filter
              :disable-filter="true"
              @keydown.prevent
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
