import type { Metadata } from "next";
import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";
import NavLink from "@/components/NavLink";
import "./globals.css";

export const metadata: Metadata = {
  title: "One More Knight",
  description:
    "A medieval-fantasy bullet-hell shoot 'em up. Play in the browser, climb the leaderboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-night font-serif text-parchment">
        <header className="flex items-center justify-between border-b border-night-line bg-night-raised px-6 py-3.5">
          <Link href="/" className="text-xl tracking-wide text-gold no-underline">
            ⚔ One More Knight
          </Link>
          <nav className="flex items-center gap-5">
            <NavLink href="/">Play</NavLink>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/wiki">Bestiary</NavLink>
            <NavLink href="/achievements">Achievements</NavLink>
            <NavLink href="/patch-notes">Patch Notes</NavLink>
            <AuthStatus />
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t border-night-line p-4 text-center text-sm text-parchment-muted">
          an endless bullet-hell · university project · alpha 1.0.0
        </footer>
      </body>
    </html>
  );
}
