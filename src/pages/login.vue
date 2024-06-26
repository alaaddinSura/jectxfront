<script setup>
import { useAppAbility } from "@/plugins/casl/useAppAbility";
import * as dates from "@/views/dashboards/functions/dates";
import axios from "@axios";
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?raw";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?raw";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import {
  emailValidator,
  requiredValidator,
  passwordValidator,
} from "@validators";
import { config } from "@/views/dashboards/functions/config";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import * as adminFetchData from "@/views/admin/functions/adminFetchData";

const baseUrl = "http://kpi.anteholding.com:3000"

const route = useRoute();
const router = useRouter();
const ability = useAppAbility();

const refVForm = ref();

const form = ref({
  email: "",
  password: "",
  remember: false,
  isValid: false,
  showMessage: false,
});

const errors = ref({
  email: undefined,
  password: undefined,
});

refVForm.value = refVForm.value || {};

const isPasswordVisible = ref(true);

const login = () => {
  const url = `${baseUrl}/loginV2`;
  const data = {
    email: form.value.email,
    password: form.value.password,
  };
  axios
    .post(url, data)
    .then((r) => {
      form.value.showMessage = true;
      form.value.isValid = true;
      if (form.value.isValid) {
        form.value.showMessage = false;
        let dateRange = [dates.findYesterdayDate()];
        let hotelids = [22964, 22966];

        //Rezerv Miktarı
        fetchData.callRezervMiktari(dateRange, hotelids, true);

        //Rezervasyon Analiz Rezerv Miktarı Oran
        fetchData.rezervMikariOran(dateRange, hotelids, true);

        //Kanalara rezervasyon Dağılım
        fetchData.callKanalRezDagilim(dateRange, hotelids, true);

        //Online Rezervasyon Miktarı
        fetchData.callOnlineRezMiktari(dateRange, hotelids, true);

        //Rezervasyon Analiz - Online Rezervasyon Miktarı Yüzdelik Oran
        fetchData.lastMonthOnlineRezMiktari(dateRange, hotelids, true);

        //Geceleme Miktarı (Doluluk)
        fetchData.callGecelemeMiktari(dateRange, hotelids, true);

        // yatak dağılım çağırma
        fetchData.callYatakDagilim(dateRange, hotelids, true);

        //Geceleme Dağılım
        fetchData.callGecelemeDagilim(dateRange, hotelids, true);

        //Ülke Dağılım
        fetchData.callUlkeDagilim(dateRange, hotelids, true);

        //Hafta Doluluk
        fetchData.callHaftaDoluluk(dateRange[0], hotelids, true);

        //Ay Doluluk
        fetchData.callAyDoluluk(dateRange[0], hotelids, true);

        //Son 7 ay Doluluk
        fetchData.callSonYediAyDoluluk(dateRange[0], hotelids, true);

        //Geçmiş Rezervasyonlar
        fetchData.callGecmisRez(dateRange[0], dateRange.length, hotelids, true);

        //Rez Analiz
        fetchData.callRezAnaliz(dateRange, hotelids, true);

        //İptal Analiz
        fetchData.callIptalAnaliz(dateRange, hotelids, true);

        //İptal Edebilir Analiz
        fetchData.callIptalEdebilirAnaliz(dateRange, hotelids, true);

        //İptal Edilebilie Analiz GÜnlük
        fetchData.callIptalEdebilirAnalizGunluk(dateRange, hotelids, true);

        //Geçmiş Rezervasyonlar Dağılım
        fetchData.callGecmisRezervasyonDagilim(
          dateRange[0],
          dateRange.length,
          hotelids,
          true
        );

        //Gelecek Doluluk
        fetchData.callDolulukGelecekRez(dateRange[0], hotelids, true);

        //Oda Tipi Dağılım
        fetchData.callOdatipiDagilim(dateRange, hotelids, true);

        // Geçmiş Rezervasyon Karşılaştırma gunluk
        fetchData.callRezervasyonGecmisGunluk(hotelids, true);

        // Geçmiş Rezervasyon Karşılaştırma Haftalık
        fetchData.rezervasyonGecmisHaftalik(hotelids, true);

        //Geçmiş Rezervasyon Karşılaştırma Aylik
        fetchData.callRezervasyonGecmisAylik(hotelids, true);

        //Channel table
        fetchData.callChannelTable(dateRange, hotelids, true);

        //Call raw data
        fetchData.callRawData(dateRange, hotelids, true);

        //Call kanal dağılım gelirler
        fetchData.callKanalDagilimGelir(dateRange, hotelids, true);

        //Call günlük takip
        fetchData.callGunlukTakip(dateRange, hotelids, true);

        //Call aylik takip
        fetchData.callAylikTakip(dateRange, hotelids, true);

        //Aylık Kazanç Durumu Rezervasyon Miktarı
        fetchData.callKazancDurumuRezMiktari(dateRange, hotelids);

        //Aylık Kazanç Durumu 7'li Grafik
        fetchData.callKazancDurumu7AyGrafik(dateRange, hotelids);

        //Kanal Dağılım Gelirler
        fetchData.callKanalDagilimGelirler(dateRange, hotelids);

        //Kazanç Durumu Oran
        fetchData.callKazancDurumuOran(dateRange, hotelids);

        //Rezervasyon Analiz - Rez Analiz
        fetchData.rezMiktarAnaliz(dateRange, hotelids, true);

        //Rezervasyon Analiz - İptal Analiz
        fetchData.rezMiktarIptalAnaliz(dateRange, hotelids, true);

        //Rol Belirleme ve Admin - Kişiler
        fetchData.userRole(true);

        fetchData.userRoleTwo(true);

        //loginV2
        fetchData.loginTwo(form.value.email, form.value.password)
        //Admin Fetch Data

        //Hedefler - Aylık Hedefler
        adminFetchData.getGoal(true);
        
        
      } else {
        form._value.showMessage = true;
      }

      return r.data
    }).then((b)=>{
       form.value.isValid = true;
       if (form.value.isValid){
         let userAbilities = [{ action: "manage", subject: "all" }];
         let accessToken = "cat2xMrZLn0FwicdGtZNzL7ifDTAKWB0k1RurSWjdnw";
         let userData = {
           avatar: "/src/assets/images/avatars/avatar-1.png",
           email: form.value.email,
           fullName: form.value.email,
           id: 1,
           role: form.value.isValid ? b.role : None,
           username: form.value.email,
           pages: b.pages,
         }
         localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
         ability.update(userAbilities);
         localStorage.setItem("userData", JSON.stringify(userData));
         localStorage.setItem("accessToken", JSON.stringify(accessToken));
         localStorage.setItem("lastTimeDate", JSON.stringify(new Date()))
         //const isUserActivePage = isUserActivePages();
      //    let originalData = userData.pages[0]; // ['Misafir Dağılım'
      //    if (Array.isArray(originalData)) {
      //      originalData = originalData.map((item) =>
      //        item
      //          .toLowerCase()
      //          .replace(/\s+/g, "-")
      //          .replace(/ğ/g, "g")
      //          .replace(/ı/g, "i")
      //      );
      //    } else {
      //      originalData = originalData
      //        .toLowerCase()
      //        .replace(/\s+/g, "-")
      //        .replace(/ğ/g, "g")
      //        .replace(/ı/g, "i");
      //    }
      //    // Redirect to `to` query if exist or redirect to index route : userData.pages.includes("Rezervasyon Analiz"): `/dashboards/${originalData}` ? 
          router.replace(route.query.to ? String(route.query.to) : "/dashboards/rezervasyon-analiz");
      //  }
       }
    })
    .catch((e) => {
      form.value.showMessage = true;
      console.log(e);
    });
};

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      login();
    }
  });
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
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

        <VCardText class="pt-1">
          <h5 class="text-h5 mb-1">
            <span class="text-capitalize"
              >{{ themeConfig.app.title }}'a hoşgeldiniz</span
            >! 👋🏻
          </h5>
          <p class="mb-0">
            Giriş yapmak için sahip olduğunuz email ve şifrenizi giriniz.
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.mail"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :rules="[requiredValidator, passwordValidator]"
                  :type="isPasswordVisible ? 'password' : 'text'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div
                  class="d-flex align-center justify-space-between flex-wrap mt-2 mb-4"
                >
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </RouterLink>
                </div>

                <!-- login button -->
                <div v-if="form.showMessage" class="text-error">
                  Kullanıcı Adı ya da Şifresi Hatalı/Mevcut Değil
                </div>
                <VBtn block type="submit"> Login </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
