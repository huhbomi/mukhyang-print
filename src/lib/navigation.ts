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
    label: "제품소개",
    children: [
      { label: "명함", href: "/product/business-card" },
      { label: "카타로그", href: "/product/catalog" },
      { label: "리플렛", href: "/product/leaflet" },
      { label: "스티커", href: "/product/sticker" },
      { label: "전단지", href: "/product/flyer" },
      { label: "봉투", href: "/product/envelope" },
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
