import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

// Providers activate when their env vars exist (AUTH_<PROVIDER>_ID/_SECRET),
// so local dev works before any OAuth app is registered.
const providers: Provider[] = [];
if (process.env.AUTH_GOOGLE_ID) providers.push(Google);
if (process.env.AUTH_GITHUB_ID) providers.push(GitHub);
if (process.env.AUTH_DISCORD_ID) providers.push(Discord);

// Dev-only fake login: any username, no password. Never enable in production.
if (process.env.DEV_LOGIN === "1") {
  providers.push(
    Credentials({
      id: "dev",
      name: "Dev login (no password)",
      credentials: { username: { label: "Username" } },
      authorize(credentials) {
        const name =
          (typeof credentials?.username === "string" && credentials.username.trim()) ||
          "TestKnight";
        return { id: `dev:${name.toLowerCase()}`, name };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        // Stable per-provider identity; this is `players.auth_id` (ADR-0004).
        token.authId =
          account.provider === "credentials" || account.provider === "dev"
            ? String(user?.id ?? account.providerAccountId)
            : `${account.provider}:${account.providerAccountId}`;
      }
      return token;
    },
    session({ session, token }) {
      session.authId = token.authId;
      return session;
    },
  },
});
