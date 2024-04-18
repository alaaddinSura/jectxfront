
const children = [
    {
        title: "Kişiler",
        to: "dashboards-misafir-dagilim",
      },
  ]
  
  export default [
    {
      title: 'Admin',
      icon: { icon: 'tabler-brand-denodo' },
      children: children,
      badgeContent: children.length,
      badgeClass: 'bg-primary',
    },
  ]