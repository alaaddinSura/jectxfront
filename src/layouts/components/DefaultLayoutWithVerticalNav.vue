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
    "/admin/kisiler",
    "/admin/hedefler"
  ];
  if (disabledUrls.includes(route.path)) {
    return true; // NavbarDatePicker engellenir
  } else {
    return false; // NavbarDatePicker engellenmez
  }
};

const disabledSelectedHotels = () => {
  const disabledUrls = [
    "/admin/kisiler",
    "/admin/hedefler"
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
        <NavbarHotelTypes v-if="!disabledSelectedHotels()"/>
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
