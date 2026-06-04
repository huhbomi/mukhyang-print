import Link from "next/link";
import type { ProductData, ProductMockupType } from "@/lib/products";

type ProductDetailProps = ProductData;

function ProductMockup({ type }: { type: ProductMockupType }) {
  return (
    <div className="flex h-56 items-center justify-center border border-border bg-[#f5f5f5] sm:h-64 md:h-72">
      {type === "business-card" && (
        <div className="flex items-end gap-4 sm:gap-6">
          <div className="h-24 w-40 border border-gray-300 bg-white shadow-sm sm:h-28 sm:w-44">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="h-2 w-16 bg-brand/70" />
              <div className="space-y-1.5">
                <div className="h-1 w-20 bg-gray-300" />
                <div className="h-1 w-14 bg-gray-200" />
                <div className="h-1 w-16 bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="h-24 w-40 rotate-3 border border-gray-300 bg-white shadow-sm sm:h-28 sm:w-44">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="h-2 w-12 bg-gray-300" />
              <div className="space-y-1.5">
                <div className="h-1 w-16 bg-gray-200" />
                <div className="h-1 w-20 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "catalog" && (
        <div className="flex items-end gap-1">
          <div className="h-44 w-28 border border-gray-300 bg-white shadow-sm sm:h-48 sm:w-32">
            <div className="border-b border-gray-200 bg-brand/10 p-2">
              <div className="h-1.5 w-12 bg-brand/60" />
            </div>
            <div className="space-y-2 p-3">
              <div className="h-1 w-full bg-gray-200" />
              <div className="h-1 w-4/5 bg-gray-200" />
              <div className="h-16 w-full bg-gray-100" />
              <div className="h-1 w-full bg-gray-200" />
              <div className="h-1 w-3/4 bg-gray-200" />
            </div>
          </div>
          <div className="h-44 w-28 -rotate-2 border border-gray-300 bg-gray-50 shadow-sm sm:h-48 sm:w-32">
            <div className="space-y-2 p-3 pt-6">
              <div className="h-1 w-full bg-gray-200" />
              <div className="h-20 w-full bg-gray-100" />
              <div className="h-1 w-full bg-gray-200" />
              <div className="h-1 w-2/3 bg-gray-200" />
            </div>
          </div>
        </div>
      )}

      {type === "leaflet" && (
        <div className="flex h-40 w-72 overflow-hidden border border-gray-300 bg-white shadow-sm sm:h-44 sm:w-80">
          {[0, 1, 2].map((panel) => (
            <div
              key={panel}
              className={`flex flex-1 flex-col border-r border-gray-200 p-3 last:border-r-0 ${
                panel === 1 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className={`mb-2 h-1.5 w-10 ${panel === 0 ? "bg-brand/60" : "bg-gray-300"}`} />
              <div className="mb-2 h-12 w-full bg-gray-100" />
              <div className="space-y-1">
                <div className="h-0.5 w-full bg-gray-200" />
                <div className="h-0.5 w-4/5 bg-gray-200" />
                <div className="h-0.5 w-3/5 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "sticker" && (
        <div className="relative h-44 w-56 border border-gray-300 bg-white p-4 shadow-sm sm:h-48 sm:w-64">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square border border-dashed border-gray-300 ${
                  i % 3 === 0 ? "rounded-full bg-brand/5" : "rounded bg-gray-50"
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full border border-brand/30 bg-brand/10" />
        </div>
      )}

      {type === "flyer" && (
        <div className="h-48 w-36 border border-gray-300 bg-white p-4 shadow-sm sm:h-52 sm:w-40">
          <div className="mb-3 h-2 w-16 bg-brand/70" />
          <div className="mb-3 h-20 w-full bg-gray-100" />
          <div className="space-y-1.5">
            <div className="h-1 w-full bg-gray-200" />
            <div className="h-1 w-full bg-gray-200" />
            <div className="h-1 w-4/5 bg-gray-200" />
            <div className="h-1 w-3/5 bg-gray-200" />
          </div>
          <div className="mt-4 h-6 w-20 border border-gray-300" />
        </div>
      )}

      {type === "envelope" && (
        <div className="relative h-36 w-56 sm:h-40 sm:w-64">
          <div className="absolute inset-x-0 bottom-0 h-28 border border-gray-300 bg-white shadow-sm sm:h-32">
            <div className="absolute inset-x-0 top-0 h-14 border-b border-gray-200 bg-gray-50">
              <div className="mx-auto mt-0 h-0 w-0 border-x-[112px] border-b-[56px] border-x-transparent border-b-gray-100 sm:border-x-[128px] sm:border-b-[64px]" />
            </div>
            <div className="absolute bottom-4 left-4 space-y-1.5">
              <div className="h-1 w-16 bg-brand/60" />
              <div className="h-1 w-24 bg-gray-200" />
              <div className="h-1 w-20 bg-gray-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TextSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="mb-5 text-base font-semibold text-gray-800">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-gray-700 md:text-[15px]">
            · {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductDetail({
  title,
  intro,
  mockupType,
  features,
  options,
  orderGuide,
}: ProductDetailProps) {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <nav
        className="mb-10 flex justify-end text-xs text-muted sm:text-sm"
        aria-label="breadcrumb"
      >
        <ol className="flex flex-wrap items-center justify-end gap-1">
          <li>
            <Link href="/" className="transition-colors hover:text-brand">
              HOME
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">
            &gt;
          </li>
          <li className="text-gray-600">제품소개</li>
          <li aria-hidden="true" className="text-gray-400">
            &gt;
          </li>
          <li className="text-gray-800">{title}</li>
        </ol>
      </nav>

      <div className="mb-10 text-center md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
          {title}
        </h1>
        <div className="mx-auto mt-4 h-px w-10 bg-brand" aria-hidden="true" />
      </div>

      <p className="mb-10 text-left text-sm leading-relaxed text-gray-700 md:mb-12 md:text-base">
        {intro}
      </p>

      <ProductMockup type={mockupType} />

      <TextSection title="특징" items={features} />
      <TextSection title="제작 가능 옵션" items={options} />
      <TextSection title="주문 안내" items={orderGuide} />

      <div className="mt-14 border-t border-border pt-10 text-center">
        <Link
          href="/inquiry"
          className="inline-block border border-gray-400 px-10 py-2.5 text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand"
        >
          견적 문의하기
        </Link>
      </div>
    </div>
  );
}
