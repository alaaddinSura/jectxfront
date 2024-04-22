const userPages = JSON.parse(localStorage.getItem("userData"))


const children = [
  {
    title: "Misafir Dağılım",
    to: "dashboards-misafir-dagilim",
  },
  {
    title: "Doluluk Dağılım",
    to: "dashboards-doluluk-dagilim",
  },
  {
    title: "Rezervasyon Gelir",
    to: "dashboards-rezervasyon-gelir",
  },
  {
    title: "Rezervasyon Analiz",
    to: "dashboards-rezervasyon-analiz",
  },
  {
    title: "Geçmiş Karşılaştırma",
    to: "dashboards-rezervasyon-gecmis"
  },
]//.filter(item => rolePage.includes(item.title))



export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: children,
    badgeContent: userPages.pages.length,
    badgeClass: 'bg-primary',
  },
]