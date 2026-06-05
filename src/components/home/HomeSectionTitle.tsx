type HomeSectionTitleProps = {
  title: string;
  description?: string;
};

export default function HomeSectionTitle({
  title,
  description,
}: HomeSectionTitleProps) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-10 bg-brand" aria-hidden="true" />
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
