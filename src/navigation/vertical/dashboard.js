
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