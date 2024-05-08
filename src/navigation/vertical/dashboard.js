const userPages = JSON.parse(localStorage.getItem("userData"))


const children = [
  {
    title: "Misafir Dağılım",
    to: "dashboards-misafir-dagilim",
    icon: { icon: 'tabler-users', pack: 'tabler-icons', size: 18 }
  },
  {
    title: "Doluluk Dağılım",
    to: "dashboards-doluluk-dagilim",
    icon: { icon: 'tabler-battery-3', pack: 'tabler-icons', size: 18 }
  },
  {
    title: "Rezervasyon Gelir",
    to: "dashboards-rezervasyon-gelir",
    icon: { icon: 'tabler-presentation-analytics', pack: 'tabler-icons', size: 18 }
  },
  {
    title: "Rezervasyon Analiz",
    to: "dashboards-rezervasyon-analiz",
    icon: { icon: 'tabler-report-analytics', pack: 'tabler-icons', size: 18 }
  },
  {
    title: "Geçmiş Karşılaştırma",
    to: "dashboards-rezervasyon-gecmis",
    icon: { icon: 'tabler-layers-difference', pack: 'tabler-icons', size: 18 }
  },
]//.filter(item => rolePage.includes(item.title))



export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: children,
    badgeContent: "5",
    badgeClass: 'bg-primary',
  },
]