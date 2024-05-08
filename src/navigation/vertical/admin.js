const children = [
  {
    title: "Kişiler",
    to: "admin-kisiler",
    icon: { icon: 'tabler-user', pack: 'tabler-icons', size: 18 }
  },
  {
    title: "Hedefler",
    to: "admin-hedefler",
    icon: { icon: 'tabler-target-arrow', pack: 'tabler-icons', size: 18 }
  },
];

export default [
  {
    title: "Admin",
    icon: { icon: "tabler-brand-denodo" },
    children: children,
    badgeContent: children.length,
    badgeClass: "bg-primary",
  },
];
