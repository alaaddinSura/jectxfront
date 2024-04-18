<script setup>
import * as fetchData from "@/views/dashboards/functions/fetchData";

const isDialogVisible = ref(false)

const props = defineProps({
    email: String,
    pages: Array,
    role: String,
})

const email = computed(()=>{
    return props.email
})

const formEntries = ref([{ email: props.email, pages: props.pages, role: props.role }]);

const updateUser = () =>{
    // console.log("props email ==> ", props.email)
    // console.log("props Pages ==> ", props.pages)
    // console.log("props Role ==> ", Object.values(props.pages))
     for (const entry of formEntries.value) {
         fetchData.updateUser(entry.email,entry.role, Object.values(entry.pages))
     }
  isDialogVisible.value = false
}

</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
        <VBtn
          v-bind="props"
        >
          Güncelle
        </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Kişi Güncelleme">
        <VIcon
        :icon="'tabler-user-cog'"
        size="62"
        class="mx-auto"
        @click="isDialogVisible = true"
        v-bind="props"
        />
      <VCardText>
        İlgili kişiyi veritabanından kalıcı olarak güncellemek istediğinizden emin misiniz ?
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          İptal
        </VBtn>
        <VBtn @click="updateUser()">
          Güncelle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>