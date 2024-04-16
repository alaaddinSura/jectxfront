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

const alertMessageVisible = ref(false);
const isFormValid = ref(false);
const ay = ref("");
const hedef = ref("");
const role = ref("");

// 👉 drawer close
const closeNavigationDrawer = () => {
  
  emit("update:isDrawerOpen", false);
  nextTick(() => {
    refForm.value?.reset();
    refForm.value?.resetValidation();
  });
};

const onSubmit = () => {
    alert("Oldu Lan")
    alertMessageVisible.value = true;
  setTimeout(() => {
    alertMessageVisible.value = false;
  }, 5000); // 5 saniye sonra alert mesajını gizle
  console.log("otel Şekli ==>", otel.value)
  console.log("hedef Şekli ==> ", hedef.value)
  console.log("Ay Şekli ==> ", ay.value)
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
      <h6 class="text-h6">Aylık Hedef Ekle</h6>

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
                  v-model="ay"
                  :rules="[requiredValidator]"
                  label="Ay"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="hedef"
                  :rules="[requiredValidator]"
                  label="Hedef"
                  type="number"
                />
              </VCol>

              <VCol cols="12">

                <VSelect
                  v-model="otel"
                  label="Otel Seç"
                  :rules="[requiredValidator]"
                  :items="[
                    'Ayasofya',
                    'Design'
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
  <VAlert
  v-if="alertMessageVisible"
      color="success"
      icon="tabler-circle-check"
      prominent
    >
      Kullanıcı Başarıyla Eklenmiştir
    </VAlert>
</template>
