<script setup>
import { themeConfig } from "@themeConfig";
import { store } from "@/store/index";
import { useRouter } from "vue-router";

const router = useRouter();

const closeModal = () => {
  store.commit("changeOpenPopup", false);
  clearInterval(intervalId);
};

const logOut = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userAbilities");
  localStorage.removeItem("userLogin");
  store.commit("changeOpenPopup", false);
  router.replace("/");
};

const remainingTime = ref(60); // Başlangıçta 60 saniye olarak ayarla
let intervalId; // setInterval'i saklamak için bir değişken oluştur

watch(
  () => store.state.openPopup,
  (newValue, oldValue) => {
    if (newValue) {
      remainingTime.value = 60;
      intervalId = setInterval(() => {
        // setInterval'i başlat ve intervalId'ye ata
        remainingTime.value = remainingTime.value - 1;
      }, 1000);
    } else {
      clearInterval(intervalId); // setInterval'i durdur
    }
  }
);

watch(remainingTime, (newValue, oldValue) => {
  if (newValue === 0) {
    closeModal();
  }
});
</script>

<template>
  <div v-show="store.state.openPopup">
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
      <div
        class="position-fixed top-0 popupContainer"
        style="width: 90%; max-width: 448px"
      >
        <VCard class="auth-card pa-4" max-width="448">
          <VCardItem class="justify-center">
            <template #prepend>
              <div class="d-flex">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
              </div>
            </template>

            <VCardTitle class="font-weight-bold text-capitalize text-h5 py-1">
              {{ themeConfig.app.title }}
            </VCardTitle>
          </VCardItem>

          <VCardText class="pt-2">
            <h5 class="text-h5 mb-3">Oturum Süresi Uyarısı</h5>
            <p class="mb-0">
              Uzun bir süredir aktif durumdasınız. Oturumunuz 1 saat boyunca
              işlem yapılmadı. Devam etmek istiyor musunuz, yoksa çıkış yapmayı
              mı tercih edersiniz? Lütfen seçiminizi yapın.
            </p>
            <p class="mb-0">Kalan süre: {{ remainingTime }}</p>
          </VCardText>

          <VCardText>
            <VRow>
              <VCol cols="6">
                <VBtn @click="closeModal()" block color="success">
                  Devam Edin
                </VBtn>
              </VCol>
              <VCol cols="6">
                <VBtn @click="logOut()" block color="error"> Çıkış Yapın </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </div>
    </div>
  </div>
</template>
<style scoped>
.popupContainer {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 50px;
  z-index: 9999;
}
</style>
