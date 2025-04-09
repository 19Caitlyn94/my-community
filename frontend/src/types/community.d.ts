export interface Community {
  id: string;
  name: string;
}

export interface CommunityExtended extends Community {
  description: string;
  image: string;
};
