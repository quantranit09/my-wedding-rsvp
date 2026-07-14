import type {
  DressCode,
  GalleryImage,
  GiftAccount,
  InvitationInfo,
  MenuItem,
  PersonProfile,
  TimelineItem,
  Verse,
  WeddingEvent,
  WeddingVenue,
  WishItem,
} from "@/types/invitation";

export const requestedAssets = {
  hero: "/images/our-images/optimized/NgocQuan.9206.jpg",
  coverSide: "/images/our-images/optimized/NgocQuan.9702-bw.jpg",
  groom: "/images/our-images/optimized/IMG_2684.jpg",
  bride: "/images/our-images/optimized/IMG_2686.jpg",
  verse: "/images/our-images/optimized/AZ9A0454-bw.jpg",
  storyBg: "/images/our-images/optimized/NgocQuan.9257.jpg",
  eventBg: "/images/our-images/optimized/NgocQuan.9702-event-crop.jpg",
  countdownBg: "/images/our-images/optimized/IMG_2693.jpg",
  rsvpBg: "/images/our-images/optimized/IMG_2687-bw.jpg",
  wishesBg: "/images/our-images/optimized/IMG_2702-wishes-crop.jpg",
  dressBg: "/images/our-images/optimized/IMG_2691.jpg",
  giftBg: "/images/our-images/optimized/IMG_2690.jpg",
  thanksBg: "/images/our-images/optimized/IMG_2680.jpg",
};

export const invitationInfo: InvitationInfo = {
  coupleNames: "Cảnh Quân & Lan Ngọc",
  sideName: "Cảnh Quân & Lan Ngọc",
  brideName: "Lan Ngọc",
  groomName: "Cảnh Quân",
  weddingDate: "Sunday, 9th August 2026",
  eventDateDisplay: "SUNDAY\n09 AUGUST 2026",
  countdownDate: "2026-08-09T17:30:00+07:00",
  calendarStartDate: "2026-08-09T15:30:00+07:00",
  calendarEndDate: "2026-08-09T21:30:00+07:00",
  calendarTimeZone: "Asia/Ho_Chi_Minh",
  calendarDescription:
    "<p>Hãy bật nhắc lịch nếu chưa được bật mặc định. (gợi ý: 15 phút trước sự kiện, hoặc tùy chỉnh lại)</p><p>Please enable alerts if they are not active by default. (set 15 minutes previously, or adjust again)</p>",
  guestGreeting: "Dear cherished guest,",
  nameNotice:
    "With warm regards, please accept our apologies for any misspelling of names or titles.",
  rsvpIntro:
    "Xin vui lòng xác nhận sự hiện diện của bạn qua biểu mẫu bên dưới.",
  rsvpOptions: ["Sẽ tham dự", "Không thể tham dự"],
  rsvpButton: "Gửi Xác Nhận",
  closingLine:
    "Cảm ơn bạn đã có mặt trong ngày chúng tôi bắt đầu một hành trình mới. Sự hiện diện và lời chúc phúc của bạn là điều thật đẹp mà gia đình chúng tôi luôn trân quý.",
  createdBy: "Cảnh Quân",
  metaTitle: "The Wedding of Cảnh Quân & Lan Ngọc - 09.08.2026",
  metaDescription:
    "Wedding invitation of Cảnh Quân and Lan Ngọc on Sunday, 9th August 2026.",
  slug: "canh-quan-lan-ngoc",
};

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
  name: "Cảnh Quân",
  relation: "The first son",
  description:
    "A calm and thoughtful groom whose quiet sincerity brings warmth, steadiness, and joy to the people he loves.",
  buttonLabel: "Cảnh Quân",
  instagramUrl: "https://www.instagram.com/aflyinghusky__/",
};

export const brideProfile: PersonProfile = {
  role: "THE BRIDE",
  name: "Lan Ngọc",
  relation: "The first daughter",
  description:
    "A graceful bride with a gentle heart, carrying beauty, kindness, and a quiet radiance into every moment.",
  buttonLabel: "Lan Ngọc",
  instagramUrl: "https://www.instagram.com/nemo.ow/",
};

export const verse: Verse = {
  reference: "A NOTE ON LOVE",
  text: "May this day mark the beginning of a gentle, faithful, and joyful journey together.",
};

export const loveStory: TimelineItem[] = [
  {
    year: "2021",
    body: "Chúng tôi gặp nhau ở EM&AI, khi mọi thứ còn bắt đầu từ những câu chuyện rất đỗi bình thường. Không ai biết rằng, giữa những ngày tháng giản dị ấy, chúng tôi đã dần để ý đến nhau.",
  },
  {
    year: "2022",
    body: "Rồi những lần đi chơi cùng nhau khiến chúng tôi tin rằng giữa hai đứa có một chữ duyên. Tình cảm đến không ồn ào, chỉ lặng lẽ lớn lên sau từng lần gặp, từng câu chuyện, từng cái nhìn.",
  },
  {
    year: "CUỐI 2022",
    body: "Quê nhà hai đứa vốn cách xa nhau, nên khi chọn yêu lâu dài, chúng tôi cũng chọn nghiêm túc với hành trình này. Cuối năm ấy, chúng tôi về ra mắt hai bên gia đình, để tình yêu có thêm sự thấu hiểu và gắn bó.",
  },
  {
    year: "2026",
    body: "Sau những mùa thương nhau, chúng tôi nhận ra nơi bình yên nhất vẫn là cạnh bên nhau. Năm 2026, chúng tôi quyết định về chung một nhà, cùng bắt đầu một đời sống mới với nhau.",
  },
];

const templeMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Temple%20Restaurant%20The%20Small%20Garden%2011%20Vo%20Nguyen%20Giap%20Da%20Nang";

export const weddingVenue: WeddingVenue = {
  name: "Temple Beach Restaurant (The Small Garden)",
  address: "11 Võ Nguyên Giáp, Đà Nẵng",
  mapUrl: templeMapsUrl,
};

export const weddingEvents: WeddingEvent[] = [
  {
    title: "Wedding Vow",
    time: "15:30",
  },
  {
    title: "Wedding Reception",
    time: "17:30",
  },
];

export const wishes: WishItem[] = [
  {
    name: "Lời chúc",
    message:
      "Sự hiện diện và lời chúc của bạn là món quà rất quý với Cảnh Quân & Lan Ngọc.",
    date: "09 Aug 2026",
  },
  {
    name: "Gửi yêu thương",
    message:
      "Bạn có thể gửi lời nhắn cho chúng tôi trong phần xác nhận tham dự.",
    date: "09 Aug 2026",
  },
  {
    name: "Lưu giữ",
    message: "Từng lời chúc sẽ được chúng tôi lưu lại như một kỷ niệm của ngày đặc biệt này.",
    date: "09 Aug 2026",
  },
];

export const giftAccounts: GiftAccount[] = [
  {
    name: "Lan Ngọc",
    bank: "TPBank",
    account: "0935426117",
    qrImage: "https://img.vietqr.io/image/970423-0935426117-qr_only.png",
    qrAlt: "QR chuyển khoản TPBank 0935426117",
  },
];

export const dressCode: DressCode = {
  title: "Earth Tone Elegance",
  description:
    "We would be delighted if guests could wear refined earth tones in black, brown, beige, olive, or matcha green.",
  colors: [
    { name: "Black", value: "#111111" },
    { name: "Brown", value: "#6B4A35" },
    { name: "Beige", value: "#D8C7A5" },
    { name: "Olive", value: "#68724B" },
    { name: "Matcha", value: "#A8B57A" },
  ],
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/our-images/optimized/NgocQuan.9206.jpg", label: "Cảnh Quân and Lan Ngọc holding hands" },
  { src: "/images/our-images/optimized/NgocQuan.8935.jpg", label: "Cảnh Quân and Lan Ngọc under the veil" },
  { src: "/images/our-images/optimized/NgocQuan.9257.jpg", label: "Celebration with confetti" },
  { src: "/images/our-images/optimized/NgocQuan.9702.jpg", label: "Elegant studio portrait" },
  { src: "/images/our-images/optimized/AZ9A0466.jpg", label: "Cảnh Quân and Lan Ngọc by the sea" },
  { src: "/images/our-images/optimized/AZ9A0952.jpg", label: "Beach ceremony portrait" },
  { src: "/images/our-images/optimized/IMG_2682.jpg", label: "Joyful sunset portrait" },
  { src: "/images/our-images/optimized/IMG_2680.jpg", label: "Indoor embrace" },
  { src: "/images/our-images/optimized/IMG_2684.jpg", label: "Groom portrait" },
  { src: "/images/our-images/optimized/IMG_2686.jpg", label: "Bride portrait" },
  { src: "/images/our-images/optimized/IMG_2687.jpg", label: "Bride bouquet detail" },
  { src: "/images/our-images/optimized/IMG_2690.jpg", label: "Bouquet detail" },
  { src: "/images/our-images/optimized/IMG_2691.jpg", label: "Dress and flower detail" },
  { src: "/images/our-images/optimized/IMG_2692.jpg", label: "Tender seated portrait" },
  { src: "/images/our-images/optimized/IMG_2695.jpg", label: "Studio full portrait" },
  { src: "/images/our-images/optimized/IMG_2700.jpg", label: "Golden veil silhouette" },
  { src: "/images/our-images/optimized/IMG_2768.jpg", label: "Golden beach portrait" },
  { src: "/images/our-images/optimized/AZ9A0437.jpg", label: "Bouquet walk detail" },
  { src: "/images/our-images/optimized/AZ9A0454.jpg", label: "Hands and bouquet at sunset" },
];

export const streamingUrl = weddingVenue.mapUrl;
export const confirmationUrl = "#rsvp";
export const backgroundMusicSrc = "/audio/sod-ven-infinity.mp3";
