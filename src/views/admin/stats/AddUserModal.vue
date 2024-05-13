<script setup>
import { emailValidator, requiredValidator,userValidator } from "@validators";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import SelectPageModal from "./SelectPageModal.vue";
import { store } from "@/store/index";

const isDialogVisible = ref(false);
const buttonDisabled = ref(false);
const adminPagesData = ["Kişiler", "Hedefler"];
const interestOptions = [
  "Misafir Dağılım",
  "Doluluk Dağılım",
  "Rezervasyon Gelir",
  "Rezervasyon Analiz",
  "Geçmiş Karşılaştırma",
];
const formEntries = ref([{ email: "", interest: [], role: "" }]);

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (
      emailValidator(entry.email) !== true ||
      entry.role.length === 0 ||
      entry.email.length === 0 || userValidator(entry.email) !== true
    ) {
      return false;
    }
  }
  return true;
});

const addNewEntry = () => {
  const newIndex = formEntries.value.length;
  formEntries.value.push({ email: "", interest: [], role: "" });
  watchEntryRole(formEntries.value[newIndex]); // Yeni giriş için izleme fonksiyonunu başlat
};

const updateUserInterest = (role, entry) => {
  const stores = store.state.addUserPages;
  const propsEmailValue = entry.email;
  if (role === "admin") {
    buttonDisabled.value = false
    if (entry.email.length != 0 && entry.role.length != 0) {
      // Eğer belirli bir email adresi zaten addUserPages dizisinde bulunuyorsa
      if (stores.some((entry) => entry.email === propsEmailValue)) {
        const indexToRemove = stores.findIndex(
          (entry) => entry.email === propsEmailValue
        );

        // Belirli öğeyi kaldır
        stores.splice(indexToRemove, 1);
      }
      const pushStore = {
        email: entry.email,
        role: entry.role,
        pages: [
          {
            from: "Dashboards",
            to: [...interestOptions],
          },
          {
            from: "Admin",
            to: [...adminPagesData],
          },
        ],
      };
      store.commit("changeAddUserPages", pushStore);
      console.log(
        "store state ==> ",
        store.state.addUserPages.flatMap((item) => item)
      );
    }
  } else {
    buttonDisabled.value = true
    for (const entry of formEntries.value) {
      entry.interest = [];
    }
  }
};



const addUser = () => {
  console.log("Store State ==> ", store.state.addUserPages);
  const email = store.state.addUserPages.map(item => item.email)
  console.log("ASDLSO ==> ", ...email)
  fetchData.addUserTwo(store.state.addUserPages.flatMap((item) => item));
  fetchData.sendMail(...email)
  store.commit("clearAddUserPages");
  formEntries.value = [{ email: "", interest: [], role: "" }];
  isDialogVisible.value = false;
};

const removeEntry = (index) => {
  if (formEntries.value.length > 1) {
    formEntries.value.splice(index, 1);
  }
};

const resetDialog = () => {
  formEntries.value = [{ email: "", interest: [], role: "" }];
  isDialogVisible.value = false;
  store.commit("clearAddUserPages");
};

const watchEntryRole = (entry) => {
  watch(
    () => entry.role,
    (newValue, oldValue) => {
      updateUserInterest(newValue, entry);
    }
  );
};

for (const entry of formEntries.value) {
  watchEntryRole(entry); // Sayfa yüklendiğinde tüm girişler için izleme fonksiyonunu başlat
}
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
    <VCard title="Yeni Kişi Ekle">
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
            <p>Yeni Kişi</p>
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="entry.email"
              label="Email"
              :rules="[requiredValidator, emailValidator, userValidator]"
            />
          </VCol>
          <VCol cols="12" sm="12">
            <VAutocomplete
              v-model="entry.role"
              :items="['admin', 'user']"
              label="Rolü"
            />
          </VCol>
          <VCol cols="12" sm="12">
            <SelectPageModal
              :role="entry.role"
              :email="entry.email"
              :disabled="!buttonDisabled"
            />
          </VCol>
          <VCol cols="12" sm="12">
            
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
          @click="removeEntry(index)"
        />
        <VSpacer />
        <VBtn variant="tonal" color="secondary" @click="resetDialog">
          Kapat
        </VBtn>
        <VBtn @click="addUser()" :disabled="!isSaveButtonActive"> Ekle </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
