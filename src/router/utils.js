import { store } from "@/store/index";
/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () =>
  !!(localStorage.getItem("userData") && localStorage.getItem("accessToken"));

export const isUserLogginInActive = () => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];
  const userRole = userData.role;
  const userisAdmin = String(userRole).toLowerCase() === "admin" ? true : false;
  return userisAdmin;
};

export const isUserActivePages = () => {
  let originalData;
  if (localStorage.getItem("userData")) {
    let userPages = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : [];

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
  } else {
    originalData = null;
  }
  return originalData;
};

export const isActivePage = (queryPath) => {
  let originalData;
  let isActiveQuery;
  if (localStorage.getItem("userData")) {
    let userPages = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : [];

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
    const index = originalData.indexOf("geçmiş-karşilaştirma");
    if (index !== -1) {
      originalData[index] = "rezervasyon-gecmis";
    }
    isActiveQuery = !originalData.includes(queryPath) ? true : false;
  } else {
    originalData = null;
  }
  return isActiveQuery;
};
