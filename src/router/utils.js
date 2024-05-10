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
    const data = JSON.parse(localStorage.getItem("userData"))
    const pagesData = data.pages
    const dashboardsData = pagesData.filter(item => item.from === "Dashboards")
    const dataPages = dashboardsData.map(item => item.to)
     const combiningArray = dataPages.flat()
    originalData = combiningArray

    if (Array.isArray(originalData)) {
      originalData = originalData.map((item) =>
        item
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/ğ/g, "g")
          .replace(/ı/g, "i")
          .replace(/ş/g, "s")
      );
    } else {
      originalData = originalData
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ş/g, "s")
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
          .replace(/ş/g, "s")
      );
    } else {
      originalData = originalData
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ş/g, "s")
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


export const isLogginPage = (queryPath) =>{
  
  let originalData;
  let isActiveQuery;
  if (localStorage.getItem("userData")) {
  const data = JSON.parse(localStorage.getItem("userData"))
  const pagesData = data.pages
  const dataPages = pagesData.map(item => item.to)
  const combiningArray = dataPages.flat()
  originalData = combiningArray
  if (Array.isArray(originalData)) {
    originalData = originalData.map((item) =>
      item
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ş/g, "s")
    );
  } else {
    originalData = originalData
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
  }
   const index = originalData.indexOf("geçmis-karsilastirma");
   if (index !== -1) {
     originalData[index] = "rezervasyon-gecmis";
   }
const activePages = originalData.some(item => queryPath.includes(item));

if (activePages) {
  isActiveQuery = true
} else {
  isActiveQuery = false
}
} else {
  originalData = null;
}

 
return isActiveQuery;
}