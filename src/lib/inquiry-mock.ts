export type AnswerStatus = "답변대기" | "답변완료";

export type AdminReply = {
  author: string;
  date: string;
  content: string;
};

export type InquiryPost = {
  id: number;
  title: string;
  locked?: boolean;
  type: string;
  author: string;
  phone?: string;
  email?: string;
  answerStatus?: AnswerStatus;
  date: string;
  content: string;
  adminReply?: AdminReply;
  isNotice?: boolean;
};

export const inquiryPosts: InquiryPost[] = [
  {
    id: 0,
    title: "상담문의 게시판 이용 안내",
    type: "공지",
    author: "관리자",
    date: "2026-06-01",
    isNotice: true,
    content:
      "안녕하세요. 묵향인쇄 상담문의 게시판입니다.\n\n인쇄 견적 및 제작 문의는 글쓰기 버튼을 통해 등록해 주시기 바랍니다. 문의 유형(명함, 카타로그, 리플렛 등)을 선택하시면 보다 빠른 상담이 가능합니다.\n\n비밀글로 등록하시면 작성 시 입력한 비밀번호로만 열람할 수 있습니다.",
  },
  {
    id: 14,
    title: "문의합니다",
    locked: true,
    type: "명함",
    author: "보르르르뿡",
    phone: "010-1234-5678",
    email: "boror@email.com",
    answerStatus: "답변대기",
    date: "2026-06-04",
    content:
      "안녕하세요. 명함 제작 견적 문의드립니다.\n\n수량: 200매\n용지: 일반지 코팅\n인쇄: 양면 4도\n\n견적과 제작 기간 안내 부탁드립니다. 감사합니다.",
  },
  {
    id: 13,
    title: "카타로그 견적 문의드립니다",
    type: "카타로그",
    author: "김인쇄",
    phone: "010-2345-6789",
    email: "kim@print.co.kr",
    answerStatus: "답변완료",
    date: "2026-06-03",
    content:
      "카타로그 제작 견적을 요청합니다.\n\n규격: A4\n페이지: 16p\n제본: 무선제본\n표지: 유광 코팅\n\n가능하시면 대략적인 단가와 납기 일정을 알려 주세요.",
    adminReply: {
      author: "관리자",
      date: "2026-06-04",
      content:
        "안녕하세요. 묵향인쇄입니다.\n\n요청하신 A4 16p 무선제본 카타로그 기준 예상 견적과 납기를 안내드립니다. 상세 견적은 파일 확인 후 다시 연락드리겠습니다.\n\n감사합니다.",
    },
  },
  {
    id: 12,
    title: "리플렛 제작 가능 여부",
    type: "리플렛",
    author: "이홍보",
    phone: "010-3456-7890",
    email: "lee@promo.com",
    answerStatus: "답변대기",
    date: "2026-06-02",
    content:
      "3단 접지 리플렛 제작이 가능한지 문의드립니다.\n\n규격: A4 접지 후 A5\n수량: 500부\n\n디자인 파일은 AI 형식으로 준비되어 있습니다.",
  },
  {
    id: 11,
    title: "스티커 대량 주문 견적",
    type: "스티커",
    author: "박라벨",
    phone: "010-4567-8901",
    email: "park@label.kr",
    answerStatus: "답변완료",
    date: "2026-05-30",
    content:
      "제품 라벨용 스티커 대량 주문 견적을 요청합니다.\n\n재질: 유포지\n형태: 원형 50mm\n수량: 3,000장\n\n대량 주문 할인 여부도 함께 안내 부탁드립니다.",
    adminReply: {
      author: "관리자",
      date: "2026-06-01",
      content:
        "안녕하세요. 묵향인쇄입니다.\n\n원형 50mm 유포지 스티커 3,000장 기준 대량 단가를 안내드립니다. 도무송 재단 포함 견적이며, 파일 확인 후 최종 견적을 전달해 드리겠습니다.",
    },
  },
];

export function getInquiryPost(id: number): InquiryPost | undefined {
  return inquiryPosts.find((post) => post.id === id);
}

export function getInquiryPostsForAdmin(): InquiryPost[] {
  return inquiryPosts.filter((post) => !post.isNotice);
}

export function getInquiryPostHref(post: InquiryPost): string {
  if (post.locked) {
    return `/inquiry/${post.id}/password`;
  }
  return `/inquiry/${post.id}`;
}
