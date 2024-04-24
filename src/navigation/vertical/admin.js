const children = [
  {
    title: "Kişiler",
    to: "admin-kisiler",
  },
  {
    title: "Hedefler",
    to: "admin-hedefler",
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
