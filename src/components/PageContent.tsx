type PageContentProps = {
  title: string;
  description: string;
};

export default function PageContent({ title, description }: PageContentProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">{title}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        {description}
      </p>
    </div>
  );
}
