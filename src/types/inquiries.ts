export type AnswerStatus = "답변대기" | "답변완료";

export type InquiryInsert = {
  inquiry_type: string;
  title: string;
  writer: string;
  password: string;
  phone: string | null;
  email: string | null;
  content: string;
  is_private: boolean;
};

/** inquiry_list_view — 목록용 */
export type InquiryListItem = {
  id: string;
  inquiry_type: string;
  title: string;
  writer: string;
  created_at: string;
  is_private: boolean;
  answer_status?: AnswerStatus | null;
};

export type InquiryDetail = {
  id: string;
  inquiry_type: string;
  title: string;
  writer: string;
  phone: string | null;
  email: string | null;
  content: string;
  is_private: boolean;
  created_at: string;
  answer_status?: AnswerStatus | null;
  admin_reply?: string | null;
  admin_reply_at?: string | null;
};

export type AdminReply = {
  date: string;
  content: string;
};
