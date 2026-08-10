"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      className={`transition-colors hover:text-gold ${active ? "text-gold" : "text-parchment"}`}
    >
      {children}
    </Link>
  );
}
