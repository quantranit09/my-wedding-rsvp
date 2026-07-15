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
  wishesBg: "/images/our-images/optimized/NgocQuan.8665.jpg",
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
    "<p>Hãy bật nhắc lịch nếu chưa được bật mặc định. (gợi ý: 15 phút trước sự kiện, hoặc tùy chỉnh lại)</p>",
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
    "Raised with love, shaped by family, and ready to begin a lifetime of his own.",
  buttonLabel: "Cảnh Quân",
  instagramUrl: "https://www.instagram.com/aflyinghusky__/",
};

export const brideProfile: PersonProfile = {
  role: "THE BRIDE",
  name: "Lan Ngọc",
  relation: "The first daughter",
  description:
    "Raised with love, cherished by family, and ready to begin a lifetime of her own.",
  buttonLabel: "Lan Ngọc",
  instagramUrl: "https://www.instagram.com/nemo.ow/",
};

export const verse: Verse = {
  reference: "A NOTE ON LOVE",
  text: "Mong ngày hôm nay mở ra một hành trình dịu dàng, thủy chung và đầy niềm vui.",
};

export const loveStoryIntro =
  "Rồi cũng đến một ngày, chúng mình đủ mạnh dạn để kể với mọi người về câu chuyện của hai đứa...";

export const loveStory: TimelineItem[] = [
  {
    year: "2021",
    body: "Tại EM&AI, chúng mình gặp nhau với vai trò là đồng nghiệp, cùng đồng hành trong một sản phẩm. Chẳng ai ngờ rằng những buổi làm việc, những lần hỗ trợ nhau mỗi ngày lại lặng lẽ mở đầu cho một hành trình dài phía trước.",
  },
  {
    year: "2022",
    body: "Cơ duyên bắt đầu từ chiếc máy tính bị hư, ngày ấy có một người đã sẵn lòng chở cô gái đi sửa. Tình cảm cứ thế đến không ồn ào, lặng lẽ lớn lên sau những lần gặp gỡ, những câu chuyện chưa bao giờ thấy đủ và những ánh mắt dần trở nên quen thuộc. Rồi ngày 29/03 năm ấy, chúng mình chính thức thành đôi.",
  },
  {
    year: "THÁNG 11 - 2022",
    body: 'Chúng mình về Bắc ra mắt gia đình và bạn bè. Một chút hồi hộp, một chút nôn nóng, có lẽ đến giờ cảm xúc ấy vẫn vẹn nguyên. Sáng mới báo tin "Con có người yêu rồi" mà tối đó, người ta đã đứng trước cửa nhà. Tình yêu nhỏ được ôm trọn trong tình yêu lớn của gia đình. Cứ thế, chúng mình trở thành con của bố mẹ hai bên.',
  },
  {
    year: "2026",
    body: "Sau những năm tháng cùng nhau trưởng thành, chúng mình nhận ra nơi bình yên nhất vẫn là cạnh bên nhau. Và thế là, chúng mình quyết định về chung một nhà. Để mỗi hành trình phía trước đều cùng nhau bước tiếp, và câu chuyện của hai đứa sẽ không dừng lại ở đây, mà chỉ vừa mở sang một chương mới.",
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
    name: "Từ trái tim",
    message:
      "Sự hiện diện của bạn đã là niềm vui lớn. Nếu có thêm một lời chúc, chúng mình sẽ giữ lại như một kỷ niệm thật đẹp.",
    date: "09 Aug 2026",
  },
  {
    name: "Một vài dòng thôi",
    message:
      "Bạn có thể gửi lời nhắn, lời chúc hoặc một kỷ niệm nhỏ trong phần xác nhận tham dự.",
    date: "09 Aug 2026",
  },
  {
    name: "Ngày vui thêm trọn",
    message:
      "Mỗi lời nhắn đều là một món quà nhỏ mà Cảnh Quân & Lan Ngọc rất trân quý.",
    date: "09 Aug 2026",
  },
];

export const giftAccounts: GiftAccount[] = [
  {
    name: "Nguyễn Thị Lan Ngọc",
    bank: "TPBank",
    account: "0421 5210 001",
    qrImage: "https://img.vietqr.io/image/970423-04215210001-qr_only.png",
    qrAlt: "QR chuyển khoản TPBank 0421 5210 001",
  },
];

export const dressCode: DressCode = {
  title: "Earth Tone Elegance",
  description:
    "Chúng tôi rất vui nếu bạn có thể chọn trang phục theo các tông màu trang nhã như đen, nâu, be, xanh olive hoặc xanh matcha.",
  colors: [
    { name: "Black", value: "#111111" },
    { name: "Brown", value: "#6B4A35" },
    { name: "Beige", value: "#D8C7A5" },
    { name: "Olive", value: "#68724B" },
    { name: "Matcha", value: "#A8B57A" },
  ],
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/our-images/optimized/NgocQuan.9206.jpg",
    label: "Cảnh Quân and Lan Ngọc holding hands",
  },
  {
    src: "/images/our-images/optimized/NgocQuan.8935.jpg",
    label: "Cảnh Quân and Lan Ngọc under the veil",
  },
  {
    src: "/images/our-images/optimized/NgocQuan.9257.jpg",
    label: "Celebration with confetti",
  },
  {
    src: "/images/our-images/optimized/NgocQuan.9702.jpg",
    label: "Elegant studio portrait",
  },
  {
    src: "/images/our-images/optimized/AZ9A0466.jpg",
    label: "Cảnh Quân and Lan Ngọc by the sea",
  },
  {
    src: "/images/our-images/optimized/AZ9A0952.jpg",
    label: "Beach ceremony portrait",
  },
  {
    src: "/images/our-images/optimized/IMG_2682.jpg",
    label: "Joyful sunset portrait",
  },
  { src: "/images/our-images/optimized/IMG_2680.jpg", label: "Indoor embrace" },
  { src: "/images/our-images/optimized/IMG_2684.jpg", label: "Groom portrait" },
  { src: "/images/our-images/optimized/IMG_2686.jpg", label: "Bride portrait" },
  {
    src: "/images/our-images/optimized/IMG_2687.jpg",
    label: "Bride bouquet detail",
  },
  { src: "/images/our-images/optimized/IMG_2690.jpg", label: "Bouquet detail" },
  {
    src: "/images/our-images/optimized/IMG_2691.jpg",
    label: "Dress and flower detail",
  },
  {
    src: "/images/our-images/optimized/IMG_2692.jpg",
    label: "Tender seated portrait",
  },
  {
    src: "/images/our-images/optimized/IMG_2695.jpg",
    label: "Studio full portrait",
  },
  {
    src: "/images/our-images/optimized/IMG_2700.jpg",
    label: "Golden veil silhouette",
  },
  {
    src: "/images/our-images/optimized/IMG_2768.jpg",
    label: "Golden beach portrait",
  },
  {
    src: "/images/our-images/optimized/AZ9A0437.jpg",
    label: "Bouquet walk detail",
  },
  {
    src: "/images/our-images/optimized/AZ9A0454.jpg",
    label: "Hands and bouquet at sunset",
  },
];

export const streamingUrl = weddingVenue.mapUrl;
export const confirmationUrl = "#rsvp";
export const backgroundMusicSrc = "/audio/sod-ven-infinity.mp3";
