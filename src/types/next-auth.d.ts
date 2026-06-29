import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      companyName?: string | null;
    };
  }

  interface User {
    companyName?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    companyName?: string | null;
  }
}
