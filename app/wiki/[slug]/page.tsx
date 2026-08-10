import { notFound } from "next/navigation";
import BestiaryDetail from "@/components/BestiaryDetail";
import { wikiEntries } from "@/lib/wiki";

export default async function WikiEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = (await wikiEntries()).find((e) => e.slug === slug);
  if (!entry) notFound();
  return <BestiaryDetail entry={entry} />;
}
