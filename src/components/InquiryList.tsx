"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InquiryBoardSearch from "@/components/InquiryBoardSearch";
import InquiryStatusBadge from "@/components/InquiryStatusBadge";
import { useAdmin } from "@/contexts/AdminContext";
import {
  fetchInquiryList,
  formatInquiryDate,
  getAnswerStatus,
  getInquiryHref,
} from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryListItem } from "@/types/inquiries";

const COL_COUNT = 6;

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

function InquiryWriteAction() {
  return (
    <Link
      href="/inquiry/write"
      className="flex h-9 w-9 items-center justify-center border border-border text-gray-600 transition-colors hover:border-brand hover:text-brand"
      aria-label="글쓰기"
    >
      <WriteIcon />
    </Link>
  );
}

function getInquiryListHref(id: string, isAdmin: boolean): string {
  return getInquiryHref(id, isAdmin);
}

export default function InquiryList() {
  const { isAdmin } = useAdmin();
  const [inquiries, setInquiries] = useState<InquiryListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadInquiries() {
      if (!isSupabaseConfigured()) {
        setErrorMessage("Supabase 연결 설정이 필요합니다.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchInquiryList();
        setInquiries(data);
        setErrorMessage(null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "문의 목록을 불러오지 못했습니다.";
        setErrorMessage(message);
        setInquiries([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadInquiries();
  }, []);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <InquiryWriteAction />
      </div>

      <div className="overflow-x-auto border-t border-border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f9f9f9]">
              <th className="w-14 border-r border-border px-2 py-3 text-center font-medium text-gray-700">
                번호
              </th>
              <th className="w-20 border-r border-border px-2 py-3 text-center font-medium text-gray-700">
                문의유형
              </th>
              <th className="border-r border-border px-3 py-3 text-left font-medium text-gray-700">
                제목
              </th>
              <th className="w-24 border-r border-border px-2 py-3 text-center font-medium text-gray-700">
                작성자
              </th>
              <th className="w-24 border-r border-border px-2 py-3 text-center font-medium text-gray-700">
                답변상태
              </th>
              <th className="w-24 px-2 py-3 text-center font-medium text-gray-700">
                날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={COL_COUNT} className="px-4 py-16 text-center text-sm text-muted">
                  문의 목록을 불러오는 중입니다...
                </td>
              </tr>
            )}

            {!isLoading && errorMessage && (
              <tr>
                <td colSpan={COL_COUNT} className="px-4 py-16 text-center text-sm text-red-600">
                  {errorMessage}
                </td>
              </tr>
            )}

            {!isLoading && !errorMessage && inquiries.length === 0 && (
              <tr>
                <td colSpan={COL_COUNT} className="px-4 py-16 text-center text-sm text-muted">
                  등록된 문의가 없습니다.
                </td>
              </tr>
            )}

            {!isLoading &&
              !errorMessage &&
              inquiries.map((inquiry, index) => {
                const href = getInquiryListHref(inquiry.id, isAdmin);

                return (
                  <tr
                    key={inquiry.id}
                    className="border-b border-border bg-white transition-colors hover:bg-gray-50/80"
                  >
                    <td className="border-r border-border px-2 py-3.5 text-center text-gray-600">
                      {inquiries.length - index}
                    </td>
                    <td className="border-r border-border px-2 py-3.5 text-center text-gray-600">
                      {inquiry.inquiry_type}
                    </td>
                    <td className="border-r border-border px-3 py-3.5">
                      <Link
                        href={href}
                        onClick={() => console.log("inquiry href", href)}
                        className="text-left text-gray-800 transition-colors hover:text-brand"
                      >
                        {inquiry.title}
                        <span className="ml-1.5 text-muted" aria-label="비밀글">
                          🔒
                        </span>
                      </Link>
                    </td>
                    <td className="border-r border-border px-2 py-3.5 text-center text-gray-600">
                      {inquiry.writer}
                    </td>
                    <td className="border-r border-border px-2 py-3.5 text-center">
                      <InquiryStatusBadge status={getAnswerStatus(inquiry)} />
                    </td>
                    <td className="px-2 py-3.5 text-center text-gray-500">
                      {formatInquiryDate(inquiry.created_at)}
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
