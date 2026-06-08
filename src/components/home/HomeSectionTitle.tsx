type HomeSectionTitleProps = {
  title: string;
  description?: string;
};

export default function HomeSectionTitle({
  title,
  description,
}: HomeSectionTitleProps) {
  return (
    <div className="mb-12 text-center md:mb-14">
      <p className="text-xs font-medium tracking-[0.2em] text-brand">MUKHYANG</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-px w-14 bg-brand/60" aria-hidden="true" />
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
