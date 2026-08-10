import { PATCH_NOTES } from "@/lib/patch-notes";

export const metadata = { title: "Patch Notes · One More Knight" };

export default function PatchNotesPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl text-gold">Patch Notes</h1>
      <div className="flex flex-col gap-10">
        {PATCH_NOTES.map((note) => (
          <article key={note.version}>
            <div className="mb-3 flex items-baseline gap-3 border-b border-night-line pb-2">
              <h2 className="text-xl text-gold">{note.version}</h2>
              <span className="text-parchment">— {note.title}</span>
              <span className="ml-auto text-sm text-parchment-muted">{note.date}</span>
            </div>
            {note.sections.map((section) => (
              <section key={section.heading} className="mb-4">
                <h3 className="mb-2 text-sm uppercase tracking-wider text-parchment-muted">
                  {section.heading}
                </h3>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-parchment">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
