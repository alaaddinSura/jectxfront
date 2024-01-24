
const children = [
  {
    title: "Misafir Dağılım",
    to: "dashboards-misafir-dagilim",
  },
  {
    title: "Rezervasyon Dağılım",
    to: "dashboards-rezervasyon-dagilim",
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
    title: "Rezervasyon Karşılaştırma",
    to: "dashboards-rezervasyon-karsilastirma",
  },
]

export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: children,
    badgeContent: children.length,
    badgeClass: 'bg-primary',
  },
]