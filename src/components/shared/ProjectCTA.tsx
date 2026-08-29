interface ProjectCTAProps {
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
  note?: string;
}

export default function ProjectCTA({
  label,
  title,
  description,
  buttonLabel,
  note,
}: ProjectCTAProps) {
  return (
    <section className="mt-12 border-t border-[var(--line)] pt-7">

      {/* Full-width heading */}
      <div>
        <span className="retro-tag retro-tag-pink">
          {label}
        </span>

        <h2 className="mt-4 max-w-5xl text-3xl font-bold md:text-4xl">
          {title}
        </h2>
      </div>

      {/* Content columns */}
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-start">
        <div>
          <p className="max-w-2xl text-sm leading-relaxed opacity-65">
            {description}
          </p>
        </div>

        <div className="md:border-l md:border-[var(--line-light)] md:pl-7">
          {note && (
            <p className="max-w-sm text-xs leading-relaxed opacity-45">
              {note}
            </p>
          )}

          <a
            href="mailto:juanpgtzg@outlook.com"
            className="retro-button mt-5 inline-flex"
          >
            {buttonLabel} →
          </a>
        </div>
      </div>
    </section>
  );
}