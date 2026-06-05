"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminNoticeRowActions from "@/components/admin/AdminNoticeRowActions";
import { fetchNoticeList, formatNoticeDate } from "@/lib/notices";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { NoticeListItem } from "@/types/notices";

export default function AdminNoticesList() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadNotices = async () => {
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
  };

  useEffect(() => {
    loadNotices();
  }, []);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          href="/admin/notices/write"
          className="border border-brand bg-brand px-5 py-2 text-sm text-white transition-colors hover:bg-brand-dark"
        >
          작성
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-300 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300 bg-[#f9f9f9]">
              <th className="w-16 border-r border-gray-300 px-3 py-3 text-center font-medium text-gray-700">
                구분
              </th>
              <th className="border-r border-gray-300 px-4 py-3 text-left font-medium text-gray-700">
                제목
              </th>
              <th className="w-28 border-r border-gray-300 px-3 py-3 text-center font-medium text-gray-700">
                날짜
              </th>
              <th className="w-32 px-3 py-3 text-center font-medium text-gray-700">
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted">
                  공지사항 목록을 불러오는 중입니다...
                </td>
              </tr>
            )}

            {!isLoading && errorMessage && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-red-600">
                  {errorMessage}
                </td>
              </tr>
            )}

            {!isLoading && !errorMessage && notices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}

            {!isLoading &&
              !errorMessage &&
              (() => {
                const regularNotices = notices.filter((notice) => !notice.is_pinned);

                return notices.map((notice) => {
                  const regularIndex = regularNotices.findIndex(
                    (item) => item.id === notice.id
                  );

                  return (
                    <tr key={notice.id} className="border-b border-gray-200">
                      <td className="border-r border-gray-200 px-3 py-3 text-center text-gray-600">
                        {notice.is_pinned ? (
                          <span className="text-xs font-medium text-brand">공지</span>
                        ) : (
                          regularNotices.length - regularIndex
                        )}
                      </td>
                  <td className="border-r border-gray-200 px-4 py-3">
                    <Link
                      href={`/customer/notice/${notice.id}`}
                      className="text-gray-800 transition-colors hover:text-brand"
                    >
                      {notice.title}
                    </Link>
                  </td>
                  <td className="border-r border-gray-200 px-3 py-3 text-center text-gray-500">
                    {formatNoticeDate(notice.created_at)}
                  </td>
                  <td className="px-3 py-3">
                    <AdminNoticeRowActions
                      postId={notice.id}
                      onDeleted={loadNotices}
                    />
                  </td>
                </tr>
                  );
                });
              })()}
          </tbody>
        </table>
      </div>
    </>
  );
}
