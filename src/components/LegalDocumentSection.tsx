type LegalDocumentSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalDocumentIntro({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-8 border-b border-border pb-8 text-sm leading-7 text-gray-700 md:text-[15px] md:leading-8">
      {children}
    </p>
  );
}

export default function LegalDocumentSection({
  title,
  children,
}: LegalDocumentSectionProps) {
  return (
    <section className="border-b border-border py-8 last:border-b-0 md:py-10">
      <h2 className="mb-5 text-base font-semibold text-gray-800 md:text-lg">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-gray-700 md:text-[15px] md:leading-8">
        {children}
      </div>
    </section>
  );
}
