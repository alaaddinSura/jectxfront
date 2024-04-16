
const children = [
  {
    title: "Misafir Dağılım",
    to: "dashboards-misafir-dagilim",
  },
  {
    title: "Doluluk Dağılım",
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
  {
    title: "Admin",
    to: "dashboards-admin"
  }
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