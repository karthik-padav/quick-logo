import "next-auth";

declare module "next-auth" {
  interface Session {
    data: {
      user: {
        svgs?: string[];
      };
    };
  }
}
