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
} from '@validators'

const form = ref({ email: '', password: '', password2: '', message: '', showMessage: false })

const route = useRoute();
const router = useRouter();

const reset = () => {

  const token = location.href.split('?')[1]
  if(form.value.password == form.value.password2){
    console.log('Form is valid, sending request...');
    axios.post(' https://suraanaliz-05a6f1924519.herokuapp.com/updatepassword?email=' + form.value.email + '&password=' + form.value.password + '&' + token)
      .then(r => {
      
        form.value.email = ''
        form.value.password = ''
        form.value.password2 = ''
        form.value.message = r.data.status != 'error' ? 'Şifre Oluşturuldu' : 'Şifre Oluşturulamadı'
        form.value.showMessage = true
        router.replace(route.query.to ? String(route.query.to) : "/login");
      })
      .catch(e => {
        form.value.email= ''
        form.value.password = ''
        form.value.password2 = ''
        form.value.message = 'Şifre Oluşturulamadı'
        form.value.showMessage = true
        console.log(e)
      })
  }
  else{
    form.value.showMessage = true
    form.value.message = 'Şifreler Uyuşmuyor'
  }
}
let isPassword = ref('')
console.log("form value password ==> ", isPassword.value)
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
                  type="password"
                  :rules="[requiredValidator, passwordValidator]"
                />
              </VCol>
              <!-- password_2 -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password2"
                  autofocus
                  label="Confirm Password"
                  type="password"
                  :rules="[requiredValidator, passwordValidator]"
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
