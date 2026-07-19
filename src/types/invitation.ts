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
  instagramUrl: string;
}

export interface GiftAccount {
  name: string;
  bank: string;
  account: string;
  qrAlt?: string;
  qrImage?: string;
}

export interface WishItem {
  name: string;
  message: string;
  date: string;
}

export interface WeddingEvent {
  title: string;
  time: string;
}

export interface WeddingVenue {
  name: string;
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

export interface InvitationInfo {
  coupleNames: string;
  sideName: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  eventDateDisplay: string;
  countdownDate: string;
  calendarStartDate: string;
  calendarEndDate: string;
  calendarTimeZone: string;
  calendarDescription: string;
  guestGreeting: string;
  guestSubline: string;
  rsvpIntro: string;
  rsvpOptions: [string, string];
  rsvpButton: string;
  closingLine: string;
  createdBy: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export interface Verse {
  reference: string;
  text: string;
}

export interface DressCodeColor {
  name: string;
  value: string;
}

export interface DressCode {
  title: string;
  description: string;
  colors: DressCodeColor[];
}
