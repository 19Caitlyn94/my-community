import { User } from "./user";

export interface PostData {
  id: number;
  body: string;
  posttype: string;
  updated_at: string;
  media_urls?: Array<string | undefined>;
  user: User;
}