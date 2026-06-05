"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InquiryBoardSearch from "@/components/InquiryBoardSearch";
import { useAdmin } from "@/contexts/AdminContext";
import { fetchNoticeList, formatNoticeDate } from "@/lib/notices";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { NoticeListItem } from "@/types/notices";

function WriteIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function NoticeWriteAction() {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <Link
      href="/admin/notices/write"
      className="flex h-9 w-9 items-center justify-center border border-border text-gray-600 transition-colors hover:border-brand hover:text-brand"
      aria-label="글쓰기"
    >
      <WriteIcon />
    </Link>
  );
}

export default function NoticeList() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotices() {
      if (!isSupabaseConfigured()) {
        setErrorMessage("Supabase 연결 설정이 필요합니다.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchNoticeList();
        setNotices(data);
        setErrorMessage(null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "공지사항 목록을 불러오지 못했습니다.";
        setErrorMessage(message);
        setNotices([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotices();
  }, []);

  const regularNotices = notices.filter((notice) => !notice.is_pinned);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <NoticeWriteAction />
      </div>

      <div className="overflow-x-auto border-t border-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f9f9f9]">
              <th className="w-16 border-r border-border px-3 py-3 text-center font-medium text-gray-700">
                번호
              </th>
              <th className="border-r border-border px-4 py-3 text-left font-medium text-gray-700">
                제목
              </th>
              <th className="w-28 px-3 py-3 text-center font-medium text-gray-700">
                날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-16 text-center text-sm text-muted">
                  공지사항 목록을 불러오는 중입니다...
                </td>
              </tr>
            )}

            {!isLoading && errorMessage && (
              <tr>
                <td colSpan={3} className="px-4 py-16 text-center text-sm text-red-600">
                  {errorMessage}
                </td>
              </tr>
            )}

            {!isLoading && !errorMessage && notices.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-16 text-center text-sm text-muted">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}

            {!isLoading &&
              !errorMessage &&
              notices.map((notice) => {
                const regularIndex = regularNotices.findIndex(
                  (item) => item.id === notice.id
                );

                return (
                  <tr
                    key={notice.id}
                    className={`border-b border-border transition-colors hover:bg-gray-50/80 ${
                      notice.is_pinned ? "bg-[#f5f5f5]" : "bg-white"
                    }`}
                  >
                    <td className="border-r border-border px-3 py-3.5 text-center text-gray-600">
                      {notice.is_pinned ? (
                        <span className="text-xs font-medium text-brand">공지</span>
                      ) : (
                        regularNotices.length - regularIndex
                      )}
                    </td>
                    <td className="border-r border-border px-4 py-3.5">
                      <Link
                        href={`/customer/notice/${notice.id}`}
                        className="text-left text-gray-800 transition-colors hover:text-brand"
                      >
                        {notice.title}
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-center text-gray-500">
                      {formatNoticeDate(notice.created_at)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <InquiryBoardSearch />

      <div className="mt-10 flex justify-center">
        <nav aria-label="페이지네이션">
          <ol className="flex items-center gap-1">
            <li>
              <span className="flex h-8 w-8 items-center justify-center border border-brand bg-brand text-sm text-white">
                1
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
