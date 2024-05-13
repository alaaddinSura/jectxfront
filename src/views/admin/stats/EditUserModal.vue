<script setup>
import * as fetchData from "@/views/dashboards/functions/fetchData";
import EditUserConfirmation from "./EditUserConfirmation.vue"
import { store } from "@/store/index";
import { watch } from "vue";
import UserEditSelectPageModal from "./UserEditSelectPageModal.vue";

const isDialogVisible = ref(false)

const props = defineProps({
    email: String,
    role: String,
    pages: Array
})
const interestOptions = ['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma'];
const adminPagesOptions = ["Kişiler", "Hedefler"];
const formEntries = ref([{ email: props.email, pages: props.pages, role: props.role }]);


const deneme = (value) =>{
  const stores = store.state.updateUserPages;
  store.commit("clearUpdateUserPages")
  for(const entry of formEntries.value){
    const propsEmailValue = entry.email;

      const pushStore = {
     "email": entry.email,
      "newRole" : entry.role,
      "newPages": [{
      "from": "Dashboards",
      "to": [...interestOptions]
      },{
        "from": "Admin",
        "to": [...adminPagesOptions],
      }]
  }
  store.commit("changeUpdateUserPages", pushStore)
  
  }
}


watch(() => formEntries.value[0].role, (newValue, oldValue) => {
    // Rol değiştiğinde yapılacak işlemler buraya yazılabilir
    if(newValue === "admin"){
      deneme()
    }
});

const handleClikClose = (data)=>{
  isDialogVisible.value = data
}

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (entry.role.length === 0) {
      return false;
    }
  }
  return true;
});

const exitModal = () =>{
  formEntries.value = ([{ email: props.email, pages: props.pages, role: props.role }]);
  isDialogVisible.value = false
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
    <VCard title="Kişiyi Güncelle">
      <VCardText>
        <VRow class="mb-3" v-for="(entry, index) in formEntries" :key="index">
            <VCol cols="12">
              <VTextField
              v-model="entry.email"
                :value="props.email"
                label="Email"
                readonly
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
            <VAutocomplete
            v-model="entry.role"
            :items="['admin','user']"
            label="Rolü"
          />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <UserEditSelectPageModal :pages="entry.pages" :role="props.role" :email="props.email"/>
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
            <EditUserConfirmation :email="entry.email" :pages="entry.pages" :role="entry.role" @modalClose="handleClikClose" :disabled="store.state.updateUserPages.length == 0"/>
          </template>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>