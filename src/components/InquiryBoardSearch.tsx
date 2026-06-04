"use client";

import type { FormEvent } from "react";

export default function InquiryBoardSearch() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="mt-8 flex w-full flex-col items-center justify-center gap-2 sm:mt-10 sm:flex-row sm:gap-1.5"
      onSubmit={handleSubmit}
      role="search"
      aria-label="게시판 검색"
    >
      <select
        name="searchType"
        defaultValue="all"
        className="h-8 w-full border border-gray-300 bg-white px-2 text-sm text-gray-700 outline-none sm:w-auto sm:min-w-[88px] focus:border-brand"
        aria-label="검색 조건"
      >
        <option value="all">전체</option>
        <option value="title">제목</option>
        <option value="author">작성자</option>
        <option value="inquiry_type">문의유형</option>
      </select>
      <input
        type="search"
        name="keyword"
        placeholder="검색어를 입력하세요"
        className="h-8 w-full border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none sm:w-52 md:w-64 focus:border-brand"
        aria-label="검색어"
      />
      <button
        type="submit"
        className="h-8 w-full border border-brand bg-brand px-5 text-sm text-white transition-colors hover:bg-brand-dark sm:w-auto"
      >
        검색
      </button>
    </form>
  );
}
