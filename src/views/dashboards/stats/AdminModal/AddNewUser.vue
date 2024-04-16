<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import * as fetchData from "@/views/dashboards/functions/fetchData"
import { emailValidator, requiredValidator } from "@validators";

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isDrawerOpen", "userData"]);

const isFormValid = ref(false);
const refForm = ref();
const email = ref("");
const role = ref([]);

// 👉 drawer close
const closeNavigationDrawer = () => {
  
  emit("update:isDrawerOpen", false);
  nextTick(() => {
    refForm.value?.reset();
    refForm.value?.resetValidation();
  });
};

const onSubmit = () => {
  console.log("Email Şekli ==>", email.value)
  console.log("Roller Şekli ==> ", role.value)
  fetchData.addUser(email.value, role.value)
};

const handleDrawerModelValueUpdate = (val) => {
  emit("update:isDrawerOpen", val);
};
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <div class="d-flex align-center pa-6 pb-1">
      <h6 class="text-h6">Kişi Ekle</h6>

      <VSpacer />

      <!-- 👉 Close btn -->
      <VBtn
        variant="tonal"
        color="default"
        icon
        size="32"
        class="rounded"
        @click="closeNavigationDrawer"
      >
        <VIcon size="18" icon="tabler-x" />
      </VBtn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="selected"
                  :items="items"
                  placeholder="Select Item"
                  label="Chips"
                  chips
                  multiple
                  closable-chips
                />
                <VSelect
                  v-model="role"
                  label="Select Role"
                  :rules="[requiredValidator]"
                  multiple
                  :items="[
                    'Misafir Dağılım',
                    'Doluluk Dağılım',
                    'Rezervasyon Gelir',
                    'Rezervasyon Analiz',
                    'Geçmiş Karşılaştırma',
                  ]"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn type="submit" class="me-3"> Submit </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
  
</template>
