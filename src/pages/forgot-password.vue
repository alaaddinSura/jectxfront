<script setup>
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?raw"
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?raw"
import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import axios from "axios"
import {
  emailValidator
} from '@validators'

const form = ref({email: '',message: '',showMessage: false })

const route = useRoute();
const router = useRouter();

let routeLogin = ref(true)

const submit = () =>{
  if (!form.value.email.trim()) {
    form.value.message = 'Mail Giriniz';
    form.value.showMessage = true;
    return; // Boş e-posta gönderisini işleme gerek yok
  }

  axios.post('https://suraanaliz-05a6f1924519.herokuapp.com/forgot-password?mail='+form.value.email).then(r=>{
    console.log(r.data)
    const status = r.data.status
    if(status == 'Token sent'){
      form.value.message = 'Email gönderildi'
      routeLogin.value = false
    }else if(status == 'Kayıtsız Mail'){
      routeLogin.value = false
      form.value.message = "Kayıtsız Mail"
    }
  })
  form.value.email = ''
  form.value.showMessage = true
}

let buttonDisabled = computed(()=>{
   let email = form.value.email
     if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return false
     }
   return true
 })

function clickHandler(){
  //router.replace(route.query.to ? String(route.query.to) : "/login");
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4" v-if="routeLogin">
    <div class="position-relative my-sm-16">
      <VNodeRenderer :nodes="h('div',{ innerHTML: authV1TopShape})" class="text-primary auth-v1-top-shape d-none d-sm-block"/>

      <VNodeRenderer :nodes="h('div', { innerHTML: authV1BottomShape})" class="text-primary auth-v1-bottom-shape d-none d-sm-block"/>

      <VCard class="auth-card pa-4" max-width="448">
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo"/>
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-capitalize text-h5 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-2">
          <h5 class="text-h5 mb-1"> Şifremi Unuttum ? 🔒</h5>
          <p class="mb-0"> Şifrenizi yenilemek için email adresinizi giriniz</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="submit">
            <VRow>

              <VCol cols="12">
                <VTextField v-model="form.email" autofocus label="Email" type="email" :rules="[emailValidator]"/>
              </VCol>

              <VCol cols="12">
                <span v-if="form.showMessage">{{ form.message }}</span>
                <VBtn block @click="clickHandler()" type="submit" :disabled="buttonDisabled">
                  Resetleme Linkini Yolla
                </VBtn>
              </VCol>

              <VCol cols="12">
                <RouterLink class="d-flex align-center justify-center" :to="{ name: 'login'}">
                  <VIcon icon="tabler-chevron-left" class="flip-in-rtl"/>
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
           <h5 class="text-h5 mb-3">
             Şifre Yenileme Maili Gönderilmiştir
           </h5>
           <p class="mb-0">
             Şifrenizi yenilemeniz için mail gönderilmiştir. Mailinize gelen link üzerinden tıklayıp şifrenizi yenileyebilirsiniz.
           </p>
         </VCardText>
 
         <VCardText>
             <VRow>
               <VCol cols="12">
                 
                 <RouterLink
                   class="d-flex align-center justify-center"
                   :to="{ name: 'login' }"
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
