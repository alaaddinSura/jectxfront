<script setup>
import axios from '@axios'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
  emailValidator,
  passwordValidator,
  requiredValidator,
  customPasswordValidator,
  confirmedValidator
} from '@validators'
import { useRoute, useRouter } from 'vue-router'
import * as fetchData from "@/views/dashboards/functions/fetchData"
import { store } from '@/store/index'
import Loader from "@/views/dashboards/functions/loader.vue"

const router = useRouter()
const route = useRoute();
const queryParams = route.query

if(!queryParams.hasOwnProperty('token')){
  router.replace('/login')
}
const form = ref({ email: '', password: '', password2: '', message: '', showMessage: false })
let routeLogin = ref(true)
const isPasswordVisible = ref(false);
const isPasswordVisibleSecond = ref(false);

const reset = () => {
    let token = location.href.split('?')[1]
    let tokenData = String(token.split('token=')[1])
    let password = form.value.password
    fetchData.updatePassword(tokenData,password)
    routeLogin.value = false
}
 let buttonDisabled = computed(()=>{
   let password1 = form.value.password
   let password2 = form.value.password2
   if(password1 === password2){
     if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!?@#$%&*()]).{8,}$/.test(password1) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!?@#$%&*()]).{8,}$/.test(password2)){
      
      return false
     }
   }
   return true
 })
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4" v-if="routeLogin">
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

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card pa-4"
        max-width="448"
      >
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
          <h5 class="text-h5 mb-1">
            Şifre Oluşturma/Yenileme 🔒
          </h5>
          <p class="mb-0">
            Sahip olmuş olduğunuz mail adresini ve oluşturmak istediğiniz şifrenizi giriniz. 
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="reset">
            <VRow>
              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  autofocus
                  label="New Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :rules="[ requiredValidator, passwordValidator]"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye' : 'tabler-eye-off'  
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>
              <!-- password_2 -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password2"
                  autofocus
                  label="Confirm Password"
                  :type="isPasswordVisibleSecond ? 'text' : 'password'"
                  :rules="[confirmedValidator(form.password2, form.password)]"
                  :append-inner-icon="
                  isPasswordVisibleSecond ? 'tabler-eye' : 'tabler-eye-off'  
                  "
                  @click:append-inner="isPasswordVisibleSecond = !isPasswordVisibleSecond"
                />
              </VCol>
              <!-- reset password -->
              <VCol cols="12">
                <div v-if="form.showMessage">
                  {{ form.message }}
                </div>
                <VBtn
                  block
                  type="submit"
                  :disabled="buttonDisabled"
                  >
                  Şifreyi Kaydet
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Girişe Dön</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>

  <div v-else>
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

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card pa-4"
        max-width="448" v-if="store.state.isUpdatePasswordTokenActiveLoader == 1"
      >
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

        <VCardText class="pt-2" v-if="store.state.isUpdatePasswordTokenActive">
          <h5 class="text-h5 mb-3">
            Şifre Yenileme Süreniz Bitmiştir
          </h5>
          <p class="mb-0">
            Şifre yenileme süreniz bitmiştir. Tekrarda şifremi unuttum kısmından kendinize mail göndererek tekrardan deneyiniz
          </p>
        </VCardText>

        <VCardText class="pt-2" v-else>
          <h5 class="text-h5 mb-3">
            Şifreniz Başarıyla Yenilenmiştir
          </h5>
          <p class="mb-0">
            Şifreniz yenilenmiştir. Devam etmek için aşağıdaki Giriş Sayfası tuşuna basarak yeni şifreniz ile giriş sağlayabilirsiniz
          </p>
        </VCardText>

        <VCardText>
            <VRow>
              <VCol cols="12">
                
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'forgot-password' }" v-if="store.state.isUpdatePasswordTokenActive"
                >
                <VBtn
                  block
                  >
                  Şifremi Unuttum
                </VBtn>
              </RouterLink>

              <RouterLink
              class="d-flex align-center justify-center"
              :to="{ name: 'login' }" v-else
            >
            <VBtn
              block
              >
              Giriş Sayfası
            </VBtn>
          </RouterLink>


              </VCol>
            </VRow>
        </VCardText>
      </VCard>
      <VCard class="auth-card pa-4"
      max-width="448" v-else>
      <Loader style="width: 100px; height: 100px; margin-left:auto; margin-right: auto; margin-top: auto; margin-bottom: auto;"/>
      </VCard>
    </div>
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
