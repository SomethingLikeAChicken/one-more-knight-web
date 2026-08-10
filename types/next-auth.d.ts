import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    authId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authId?: string;
  }
}
