import Link from "next/link";
import { auth, signOut } from "@/auth";

const buttonClasses =
  "rounded border border-gold px-3 py-1 text-sm text-gold no-underline transition-colors hover:bg-gold hover:text-night cursor-pointer";

export default async function AuthStatus() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/api/auth/signin" className={buttonClasses}>
        Sign in
      </Link>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="flex items-center gap-2.5"
    >
      <span className="text-sm text-parchment-muted">{session.user.name}</span>
      <button type="submit" className={buttonClasses}>
        Sign out
      </button>
    </form>
  );
}
