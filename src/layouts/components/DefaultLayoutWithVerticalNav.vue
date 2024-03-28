<script setup>
import navItems from "@/navigation/vertical";
import { useThemeConfig } from "@core/composable/useThemeConfig";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import NavBarDatePicker from "./NavBarDatePicker.vue";
import NavbarHotelTypes from "./NavbarHotelTypes.vue";
import NavbarLogOut from "./NavbarLogOut.vue";

// @layouts plugin
import { VerticalNavLayout } from "@layouts";
import { useRoute } from "vue-router";
import { store } from '@/store/index'

const route = useRoute();
const now = new Date();
const dateRange = ref("");

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig();
const { width: windowWidth } = useWindowSize();
import { useRouter } from "vue-router";

const filteredNavItems = navItems.filter((item) => {
  if (item.roles && item.roles.includes("admin")) {
    return hasRole("admin");
  }
  return true;
});

const disabledDatePicker = () => {
  const disabledUrls = [
    "/dashboards/rezervasyon-gecmis",
    "/dashboards/rezervasyon-gelir",
    "/dashboards/deneme",
  ];
  if (disabledUrls.includes(route.path)) {
    return true; // NavbarDatePicker engellenir
  } else {
    return false; // NavbarDatePicker engellenmez
  }
};

const disabledNextDate = () => {
  const disabledUrls = ["/dashboards/rezervasyon-analiz"];
  return disabledUrls.includes(route.path);
};
const router = useRouter();

const deneme = () => {
  
}
const logOut = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userAbilities");
  router.replace("/");
};

let lastActiveTime = new Date();
let logoutTimeThreshold = 15 * 60 * 1000; // 15 dakika * 60 saniye * 1000 milisaniye

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    lastActiveTime = new Date();
  } else {
    const currentTime = new Date();
    const inactiveTimeInMillis = currentTime - lastActiveTime;
    if (inactiveTimeInMillis >= logoutTimeThreshold) {
      logOut();
    } else {
      const inactiveTimeInSeconds = inactiveTimeInMillis / 1000;
      const inactiveTimeInMinutes = Math.floor(inactiveTimeInSeconds / 60);
      const remainingSeconds = Math.floor(inactiveTimeInSeconds % 60);
    }
  }
}
document.addEventListener("visibilitychange", handleVisibilityChange);


function oneHoursPopup() {
  const loginDate = new Date(JSON.parse(localStorage.getItem("loginTime")));
  store.commit("changeOpenPopup", true);
}

// store.state.openPopup değeri değiştiğinde tetiklenecek olan watch fonksiyonu
watch(
  () => store.state.openPopup,
  (newValue) => {
    if (!newValue) {
      // Eğer store.state.openPopup false ise, 30 saniyede bir oneHoursPopup fonksiyonunu çağır
      const intervalId = setInterval(oneHoursPopup, 30000);

      // store.state.openPopup true olduğunda setInterval'ı durdur
      watch(
        () => store.state.openPopup,
        (newValue) => {
          if (newValue) {
            clearInterval(intervalId);
          }
        }
      );
    }
  }
);

// Başlangıçta store.state.openPopup değeri false ise oneHoursPopup fonksiyonunu çağır
if (!store.state.openPopup) {
  oneHoursPopup();
}

let intervalID = null; // setInterval'in ID'sini saklamak için bir değişken tanımlıyoruz

function startPopupInterval() {
  // Eğer intervalID değeri null ise, yani interval henüz başlatılmamışsa
  if (intervalID === null) {
    // Eğer openPopup false ise, her 30 saniyede bir oneHoursPopup fonksiyonunu çağır
    if (!store.state.openPopup) {
      intervalID = setInterval(oneHoursPopup, 30 * 1000); // 30 saniye = 30 * 1000 milisaniye
    }
  }
}

// Sayfa yenilendiğinde çalışacak kod
window.onload = function() {
  clearInterval(intervalID); // Önceki setInterval'ı temizle
  startPopupInterval(); // Yeniden setInterval'ı başlat
};

</script>

<template>
  <VerticalNavLayout :nav-items="filteredNavItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon size="26" icon="tabler-menu-2" />
        </IconBtn>

        <!-- Otel türleri -->
        <NavbarHotelTypes :disabled="store.state.openPopup"/>
        <!-- date picker -->
        <NavBarDatePicker
          v-if="!disabledDatePicker()"
          :nextDate="disabledNextDate()" :disabled="store.state.openPopup"
        />
        <VSpacer />
        <NavbarThemeSwitcher class="me-1" />
        <NavbarLogOut />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
