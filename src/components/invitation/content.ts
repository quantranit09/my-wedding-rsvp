import type {
  GalleryImage,
  GiftAccount,
  MenuItem,
  PersonProfile,
  TimelineItem,
  WeddingEvent,
  WishItem,
} from "@/types/invitation";

export const menuItems: MenuItem[] = [
  { label: "Home", target: "home" },
  { label: "Profile", target: "profile" },
  { label: "Love Story", target: "lovestory" },
  { label: "Wedding Event", target: "weddingevent" },
  { label: "RSVP", target: "rsvp" },
  { label: "Wedding Gift", target: "weddinggift" },
  { label: "Gallery", target: "gallery" },
];

export const groomProfile: PersonProfile = {
  role: "THE GROOM",
  name: "Imam Faizan",
  relation: "The second son of",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  buttonLabel: "Imam",
};

export const brideProfile: PersonProfile = {
  role: "THE BRIDE",
  name: "Nandira Syafira",
  relation: "The first daughter of",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  buttonLabel: "Nandira",
};

export const loveStory: TimelineItem[] = [
  {
    year: "SEPTEMBER 2019",
    body: "2019, we started our journey as two individuals who were just getting to know each other. We were excited to explore what the future held for us and were eager to see where our paths would lead.",
  },
  {
    year: "SEPTEMBER 2020",
    body: "In 2020, we continued our journey, facing challenges and obstacles along the way. We learned how to communicate effectively and work together as a team, and our relationship grew stronger as a result.",
  },
  {
    year: "SEPTEMBER 2023",
    body: "And now, in 2023, we have reached the pinnacle of our journey - marriage. It has been a joyous and exciting ride filled with laughter, love, and endless possibilities.",
  },
];

export const weddingEvents: WeddingEvent[] = [
  {
    title: "Holy Matrimony",
    time: "12.00 - 01.00 PM",
    venue: "Gereja Katedral Jakarta",
    address: "Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    mapUrl: "https://maps.app.goo.gl/fQGiC37iEx6fcuNq8",
  },
  {
    title: "Wedding Reception",
    time: "12.00 - 01.00 PM",
    venue: "Gereja Katedral Jakarta",
    address: "Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    mapUrl: "https://maps.app.goo.gl/fQGiC37iEx6fcuNq8",
  },
];

export const wishes: WishItem[] = [
  {
    name: "Guest Name",
    message: "Selamat",
    date: "20 Jun 2025",
  },
  {
    name: "Jaya",
    message: "Sangat Fungsional dan Cakep banget undangannya ! Fitur sangat baik dan rapi polll",
    date: "27 Nov 2024",
  },
  {
    name: "Mr. Example",
    message: "Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public.",
    date: "27 Nov 2024",
  },
  {
    name: "Mr. Example",
    message: "Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public.",
    date: "27 Nov 2024",
  },
  {
    name: "Anastasya",
    message: "Mantap di beri akses buat edit, jadi kalau revisi tinggal ganti sendiri gak ribet, thank you",
    date: "14 Aug 2024",
  },
  {
    name: "Pika",
    message: "Ok sip",
    date: "14 Mar 2024",
  },
];

export const giftAccounts: GiftAccount[] = [
  { name: "Shirley Lorraine", bank: "Bank BCA", account: "0087771222" },
  { name: "Shirley Lorraine", bank: "Bank Mandiri", account: "001231200" },
  { name: "Brandon William", bank: "Bank BCA", account: "0800123123" },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/imam-nandira-00189.jpg.jpeg", label: "Gallery image 1" },
  { src: "/images/imam-nandira-00195-copy.jpg.jpeg", label: "Gallery image 2" },
  { src: "/images/imam-nandira-00171.jpg.jpeg", label: "Gallery image 3" },
  { src: "/images/imam-nandira-00162.jpg.jpeg", label: "Gallery image 4" },
  { src: "/images/imam-nandira-00148.jpg-1.jpeg", label: "Gallery image 5" },
  { src: "/images/imam-nandira-00181.jpg-1.jpeg", label: "Gallery image 6" },
  { src: "/images/imam-nandira-00183.jpg-1.jpeg", label: "Gallery image 7" },
  { src: "/images/imam-nandira-00186-copy.jpg-1.jpeg", label: "Gallery image 8" },
];

export const instagramUrl = "https://www.instagram.com/groovepublic.id";
export const streamingUrl = "https://www.youtube.com/@Groovepublic";
export const confirmationUrl = "https://wa.link/amk9ua";
