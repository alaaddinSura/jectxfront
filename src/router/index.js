import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import routes from '~pages'
import { canNavigate } from '@layouts/plugins/casl'

let userPages
let originalData
if(localStorage.getItem("userData")){
  userPages = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : []

  originalData = userPages.pages;
  
  if (Array.isArray(originalData)) {
    originalData = originalData.map((item) =>
      item
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
    );
  } else {
    originalData = originalData
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i");
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: '/',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const userRole = userData && userData.role ? userData.role : null
        if (userRole === 'admin')
          return { name: 'dashboards-rezervasyon-analiz' }
        if (userRole === 'client')
          return { name: 'access-control' }
        
        return { name: 'login', query: to.query }
      },
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    {
      path: '/pages/account-settings',
      redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    },
    ...setupLayouts(routes),
  ],
})


// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(to => {
  const isLoggedIn = isUserLoggedIn()
  const queryPath = to.path.substring(to.path.indexOf('/', 1) + 1);
  
  if(localStorage.getItem("userData")){
    if(userPages.role === 'admin'){
      if (to.path.startsWith('/dashboards/')) {
        // queryPath originalData dizisinde bulunuyorsa:
        if (originalData.includes(queryPath)) {
          console.log("Doğru");
        } else {
          router.push('/dashboards/' + originalData[0]);
        }
      } else {
      }
    }else{
      if (to.path.startsWith('/dashboards/')) {
        // queryPath originalData dizisinde bulunuyorsa:
        if (originalData.includes(queryPath)) {
        } else {
          router.push('/dashboards/' + originalData[0]);
        }
      } else {
        router.push('/dashboards/' + originalData[0]);
      }
    }
  }
  // if (!isLoggedIn) {
  //   // Kullanıcı giriş yapmamışsa ve talep edilen sayfa giriş sayfası değilse, giriş sayfasına yönlendir
  //   return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } };
  // }

  // // Eğer kullanıcı giriş yapmışsa ve talep edilen sayfa originalData'da bulunan linklerden biri değilse, ilk link sayfasına yönlendir
  // if (!originalData.includes(to.name)) {
  //   return { name: originalData[0] };
  // }

  /*
  
    ℹ️ Commented code is legacy code
  
    if (!canNavigate(to)) {
      // Redirect to login if not logged in
      // ℹ️ Only add `to` query param if `to` route is not index route
      if (!isLoggedIn)
        return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })
  
      // If logged in => not authorized
      return next({ name: 'not-authorized' })
    }
  
    // Redirect if logged in
    if (to.meta.redirectIfLoggedIn && isLoggedIn)
      next('/')
  
    return next()
  
    */
  if (canNavigate(to)) {
    if (to.meta.redirectIfLoggedIn && isLoggedIn)
      return '/'
  }
  else {
    if (isLoggedIn)
      return { name: 'not-authorized' }
    else
      return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  }
})
export default router
