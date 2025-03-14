import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    status: string;
    profile_image: string;
    bio: string;
  }
} 