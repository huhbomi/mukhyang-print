export type NoticePost = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  isPinned?: boolean;
};

export const noticePosts: NoticePost[] = [
  {
    id: 0,
    title: "묵향인쇄 홈페이지가 오픈되었습니다.",
    author: "관리자",
    date: "2026-06-04",
    isPinned: true,
    content:
      "안녕하세요. 묵향인쇄입니다.\n\n묵향인쇄 공식 홈페이지가 오픈되었습니다. 명함, 카타로그, 리플렛, 스티커, 전단지, 봉투 등 다양한 인쇄물 제작 서비스를 홈페이지를 통해 편리하게 이용하실 수 있습니다.\n\n앞으로도 고품질 인쇄 서비스로 보답하겠습니다. 감사합니다.",
  },
  {
    id: 5,
    title: "여름 휴가 기간 제작 일정 안내",
    author: "관리자",
    date: "2026-07-20",
    content:
      "여름 휴가 기간 동안 인쇄물 제작 일정이 일부 조정됩니다.\n\n휴가 기간: 2026년 8월 1일 ~ 8월 10일\n\n해당 기간 접수 건은 납기가 2~3영업일 지연될 수 있으니 참고해 주시기 바랍니다. 급한 건은 사전에 연락 주시면 최대한 조율해 드리겠습니다.",
  },
  {
    id: 4,
    title: "명함 제작 시 유의사항 안내",
    author: "관리자",
    date: "2026-06-18",
    content:
      "명함 제작 시 아래 사항을 확인해 주세요.\n\n1. 인쇄용 파일은 300dpi 이상의 PDF 또는 AI 파일을 권장합니다.\n2. 재단선(도련선)을 파일에 포함해 주세요.\n3. 코팅, 박, 형압 등 후가공은 별도 표기가 필요합니다.\n4. 시안 확인 후 최종 승인된 파일만 인쇄에 들어갑니다.",
  },
  {
    id: 3,
    title: "카타로그 제작 기간 안내",
    author: "관리자",
    date: "2026-05-30",
    content:
      "카타로그 제작 기간 안내입니다.\n\n· 8~16p (중철제본): 약 5~7영업일\n· 16~32p (무선제본): 약 7~10영업일\n· 후가공(코팅, 박 등) 포함 시 1~2영업일 추가\n\n페이지 수와 제본 방식에 따라 일정이 달라질 수 있으니 견적 문의 시 납기를 함께 안내해 드립니다.",
  },
  {
    id: 2,
    title: "인쇄 파일 접수 안내",
    author: "관리자",
    date: "2026-05-12",
    content:
      "인쇄 파일 접수 방법을 안내합니다.\n\n· 권장 형식: PDF, AI\n· 해상도: 300dpi 이상\n· 색상 모드: CMYK\n· 글꼴: 아웃라인 처리 또는 폰트 첨부\n\n파일 오류로 인한 인쇄 문제를 방지하기 위해 접수 전 파일 검수를 권장합니다.",
  },
  {
    id: 1,
    title: "묵향인쇄 공지사항 게시판입니다.",
    author: "관리자",
    date: "2026-06-04",
    content:
      "묵향인쇄 공지사항 게시판입니다.\n\n새로운 소식, 휴무 안내, 제작 일정 변경 등 중요한 안내 사항을 이곳에서 확인하실 수 있습니다.\n\n궁금한 점은 상담문의 게시판을 이용해 주세요.",
  },
];

export function getNoticePost(id: number): NoticePost | undefined {
  return noticePosts.find((post) => post.id === id);
}
