<script setup>
import { emailValidator, requiredValidator } from "@validators";
import * as fetchData from "@/views/dashboards/functions/fetchData";


const isDialogVisible = ref(false)

const email = ref('')
const interest = ref([])//userRole

const formEntries = ref([{ email: '', interest: [], role: '' }]);

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (emailValidator(entry.email) !== true || entry.interest.length === 0 || entry.role.length === 0) {
      return false;
    }
  }
  return true;
});

const addNewEntry = () => {
  formEntries.value.push({ email: '', interest: [], role: '' });
};

const addUser = () =>{
    for (const entry of formEntries.value) {
        fetchData.addUser(entry.email, entry.interest, entry.role)
        fetchData.sendMail(entry.email);
    }
    isDialogVisible.value = false
}


const removeEntry = (index) => {
    if (formEntries.value.length > 1) {
    formEntries.value.splice(index, 1);
  }
};

const resetDialog = () => {
  formEntries.value = [{ email: '', interest: [], role: '' }];
  isDialogVisible.value = false
};
</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
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
    <VCard title="Yeni Kişi Ekle">
      <VCardText>
        <VRow v-for="(entry, index) in formEntries" :key="index" class="mb-10" :style="{ backgroundColor: 'rgba(128, 128, 128, 0.1)', padding: '5px', borderRadius: '10px' }">
            <VCol cols="12">
                <p>Yeni Kişi</p>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="entry.email"
                label="Email"
                :rules="[requiredValidator, emailValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VAutocomplete
                v-model="entry.interest"
                multiple
                :items="['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Analiz']"
                label="Sayfalar"
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VAutocomplete
                v-model="entry.role"
                :items="['admin', 'user']"
                label="Rolü"
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
        <VBtn
          variant="tonal"
          color="secondary"
          @click="resetDialog"
        >
          Kapat
        </VBtn>
        <VBtn @click="addUser()" :disabled="!isSaveButtonActive">
          Ekle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>