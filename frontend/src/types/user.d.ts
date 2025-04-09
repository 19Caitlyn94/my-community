import { Community } from "./community";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface UserExtended extends User {
  email: string;
  status: string;
  bio: string;
  communities: Array<Community>;
}