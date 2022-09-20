import { User } from "firebase/auth";

export interface Site {
  id?: string;
  authorId: User["uid"];
  createdAt: string;
  name: string;
  url: string;
}

export type Sites = {
  sites: Site[];
};

type StatusType = "pending" | "active";

export type FeedbackData = {
  id?: string;
  author: User["displayName"];
  authorId: User["uid"];
  createdAt: string;
  provider: string;
  siteId: Site["id"];
  status: StatusType;
  text: string;
};
