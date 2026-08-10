import BestiaryGrid from "@/components/BestiaryGrid";
import { wikiEntries } from "@/lib/wiki";

export const metadata = { title: "Bestiary · One More Knight" };

export default async function WikiPage() {
  const entries = await wikiEntries();
  return (
    <div>
      <h1 className="mb-1 text-2xl text-gold">Bestiary</h1>
      <BestiaryGrid entries={entries} />
    </div>
  );
}
