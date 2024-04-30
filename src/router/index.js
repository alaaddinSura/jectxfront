import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import {
  isUserLoggedIn,
  isUserLogginInActive,
  isActivePage,
  isUserActivePages,
} from "./utils";
import routes from "~pages";
import { canNavigate } from "@layouts/plugins/casl";
import { store } from "@/store/index";

if (localStorage.getItem("userData")) {
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: "/",
      redirect: (to) => {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const userRole = userData && userData.role ? userData.role : null;
        if (userRole === "admin")
          return { name: "dashboards-rezervasyon-analiz" };
        if (userRole === "client") return { name: "access-control" };

        return { name: "login", query: to.query };
      },
    },
    {
      path: "/pages/user-profile",
      redirect: () => ({
        name: "pages-user-profile-tab",
        params: { tab: "profile" },
      }),
    },
    {
      path: "/pages/account-settings",
      redirect: () => ({
        name: "pages-account-settings-tab",
        params: { tab: "account" },
      }),
    },
    ...setupLayouts(routes),
  ],
});

const logOut = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userAbilities");
  router.replace("/");
};

let logoutTimeThreshold = 15 * 60 * 1000; //15 dakika
const dateMinutes = () => {
  const lastTimeDate = new Date(
    JSON.parse(localStorage.getItem("lastTimeDate"))
  );
  store.commit("changeInActive", false);
  const currentDate = new Date();
  const inactiveTimeInMillis = currentDate.getTime() - lastTimeDate.getTime();
  if (inactiveTimeInMillis >= logoutTimeThreshold) {
    store.commit("changeInActive", true);
    localStorage.setItem("lastTimeDate", JSON.stringify(new Date()));
  } else {
    localStorage.setItem("lastTimeDate", JSON.stringify(new Date()));
  }
};

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to) => {
  const isLoggedIn = isUserLoggedIn();
  const isAdmin = isUserLogginInActive();
  const queryPath = to.path.substring(to.path.indexOf("/", 1) + 1);
  const isActivePages = isActivePage(queryPath);
  const isUserActivePage = isUserActivePages();

  if (isLoggedIn) {
    dateMinutes();
    if (isAdmin) {
      if (to.path.startsWith("/dashboards/")) {
        if (isActivePages) {
          router.push("/dashboards/" + isUserActivePage[0]);
        }
      }
    } else {
      if (to.path.startsWith("/dashboards/")) {
        // queryPath originalData dizisinde bulunuyorsa:
        if (!isActivePages) {
          router.push("/dashboards/" + isUserActivePage[0]);
        }
      } else {
        router.push("/dashboards/" + isUserActivePage[0]);
      }
    }
    if (store.state.inActive) {
      logOut();
    }
  }
  

  if (canNavigate(to)) {
    if (to.meta.redirectIfLoggedIn && isLoggedIn) return "/";
  } else {
    if (isLoggedIn) return { name: "not-authorized" };
    else
      return {
        name: "login",
        query: { to: to.name !== "index" ? to.fullPath : undefined },
      };
  }
});
export default router;
