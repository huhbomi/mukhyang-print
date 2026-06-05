export type Notice = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_pinned: boolean;
  updated_at: string;
};

export type NoticeListItem = Pick<
  Notice,
  "id" | "title" | "created_at" | "is_pinned"
>;

export type NoticeInsert = {
  title: string;
  content: string;
  is_pinned: boolean;
};

export type NoticeUpdate = {
  title: string;
  content: string;
  is_pinned: boolean;
};
