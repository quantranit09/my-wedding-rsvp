export interface TimelineItem {
  year: string;
  body: string;
}

export interface PersonProfile {
  role: string;
  name: string;
  relation: string;
  description: string;
  buttonLabel: string;
}

export interface GiftAccount {
  name: string;
  bank: string;
  account: string;
}

export interface WishItem {
  name: string;
  message: string;
  date: string;
}

export interface WeddingEvent {
  title: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
}

export interface GalleryImage {
  src: string;
  label: string;
}

export interface MenuItem {
  label: string;
  target: string;
}
