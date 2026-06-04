import Link from "next/link";

import InquiryBoardSearch from "@/components/InquiryBoardSearch";

import NoticeListWriteButton from "@/components/NoticeListWriteButton";

import { noticePosts } from "@/lib/notice-mock";



export default function NoticeList() {

  return (

    <>

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

              <th className="w-28 border-r border-border px-3 py-3 text-center font-medium text-gray-700">

                작성자

              </th>

              <th className="w-28 px-3 py-3 text-center font-medium text-gray-700">

                날짜

              </th>

            </tr>

          </thead>

          <tbody>

            {noticePosts.map((post) => (

              <tr

                key={post.id}

                className={`border-b border-border transition-colors hover:bg-gray-50/80 ${

                  post.isPinned ? "bg-[#f5f5f5]" : "bg-white"

                }`}

              >

                <td className="border-r border-border px-3 py-3.5 text-center text-gray-600">

                  {post.isPinned ? (

                    <span className="text-xs font-medium text-brand">공지</span>

                  ) : (

                    post.id

                  )}

                </td>

                <td className="border-r border-border px-4 py-3.5">

                  <Link

                    href={`/customer/notice/${post.id}`}

                    className="text-left text-gray-800 transition-colors hover:text-brand"

                  >

                    {post.title}

                  </Link>

                </td>

                <td className="border-r border-border px-3 py-3.5 text-center text-gray-600">

                  {post.author}

                </td>

                <td className="px-3 py-3.5 text-center text-gray-500">{post.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <NoticeListWriteButton />

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


