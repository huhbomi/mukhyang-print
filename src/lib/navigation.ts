export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "회사소개",
    children: [
      { label: "인사말", href: "/company/greeting" },
      { label: "오시는길", href: "/company/location" },
    ],
  },
  {
    label: "상담문의",
    href: "/inquiry",
  },
  {
    label: "고객센터",
    children: [{ label: "공지사항", href: "/customer/notice" }],
  },
];
