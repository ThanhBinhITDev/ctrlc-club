import { SiteContent } from "@/types/siteContent";

export const defaultSiteContent: SiteContent = {
  theme: {
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#64748b",
    surface: "rgba(255, 255, 255, 0.8)",
    surface_strong: "#f8fafc",
    line: "rgba(15, 23, 42, 0.08)",
    brand: "#10b981",
    brand_deep: "#059669",
    accent: "#f97316",
    accent_soft: "#ffedd5",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    focus: "#10b981",
  },
  brand: {
    name: "CTRL/C CLUB",
    mark: "C/C",
    tagline: "Build / Share / Lead",
    description: "Cộng đồng học tập và xây dựng sản phẩm cho sinh viên yêu công nghệ",
  },
   navigation: [
     { label: "Giới thiệu", href: "/#gioi-thieu" },
     { label: "Hoạt động", href: "/#hoat-dong" },
     { label: "Văn hóa", href: "/#van-hoa" },
     { label: "Liên hệ", href: "/#lien-he" },
   ],
  hero: {
    eyebrow: "Ctrl/C Club",
    title: "Nơi thành viên cùng học kỷ luật làm sản phẩm, không chỉ học code.",
    description:
      "Chúng tôi xây dựng một môi trường để sinh viên luyện kỹ năng kỹ thuật, vận hành nhóm, và tư duy trách nhiệm thông qua workshop, dự án nội bộ và các hoạt động cộng đồng.",
    primary_cta_label: "Vào hệ thống quản trị",
    primary_cta_url: "/login",
    secondary_cta_label: "Xem hoạt động nổi bật",
    secondary_cta_url: "/#hoat-dong",
    stats: [
      { value: "50+", label: "thành viên tham gia hoạt động" },
      { value: "12", label: "chủ đề workshop có thể triển khai" },
      { value: "3", label: "nhóm trọng tâm vận hành song song" },
    ],
  },
  spotlight: {
    label: "Mùa hoạt động",
    title: "Sprint xây dựng nội lực",
    focus: "Frontend, backend, vận hành nội bộ",
    format: "Workshop + pairing + task force",
    goal: "Mỗi thành viên có sản phẩm và vai trò rõ ràng",
    priorities: [
      "Xây dựng sản phẩm nội bộ cho CLB và khoa",
      "Tổ chức workshop, sharing, onboarding cho thành viên mới",
      "Vận hành hệ thống quản trị, tài liệu và quy trình làm việc",
    ],
  },
  introduction: {
    section_id: "gioi-thieu",
    cards: [
      {
        icon: "layers3",
        title: "Workshop thực chiến",
        description: "Các buổi học theo dự án, từ web cơ bản đến quy trình deploy và vận hành.",
      },
      {
        icon: "users",
        title: "Văn hóa peer-learning",
        description: "Thành viên học cùng nhau, review code, chia sẻ kinh nghiệm và kéo nhau cùng tiến.",
      },
      {
        icon: "shield-check",
        title: "Môi trường có trách nhiệm",
        description: "Ranh mạch trong vai trò, nhưng luôn ưu tiên tinh thần hỗ trợ và tin cậy.",
      },
    ],
  },
  activities: {
    section_id: "hoat-dong",
    label: "Hoạt động",
    title: "Lộ trình học tập gần với vận hành thật.",
    description:
      "Mỗi giai đoạn đều hướng thành viên vào một kết quả rõ ràng: hiểu hệ thống, làm việc có quy trình, và có khả năng bàn giao sản phẩm trong nhóm.",
    items: [
      {
        index: "01",
        title: "Onboarding theo vai trò",
        description: "Thành viên mới được đánh vào đúng nhóm, đúng tài liệu và cách làm việc phù hợp thay vì tự bơi.",
      },
      {
        index: "02",
        title: "Workshop và phiên pairing",
        description: "Tác vụ được tách nhỏ, có người đồng hành, có review sau mỗi buổi để giữ nhiệt học tập liên tục.",
      },
      {
        index: "03",
        title: "Dự án nội bộ có deadline",
        description: "Thành viên thực hành từ khâu lên ý tưởng, chia việc, triển khai, test, ghi tài liệu đến demo.",
      },
    ],
  },
  culture: {
    section_id: "van-hoa",
    label: "Văn hóa làm việc",
    items: [
      {
        title: "Rõ ràng",
        description: "Việc nào, deadline nào, người nào chịu trách nhiệm đều được nói minh bạch.",
      },
      {
        title: "Hỗ trợ",
        description: "Không để thành viên mới tự xoay một mình; review và pairing là mặc định.",
      },
      {
        title: "Tiến bộ",
        description: "Mọi hoạt động đều nhằm đến năng lực thật, không dừng ở mức tham gia cho có.",
      },
    ],
  },
  contact: {
    section_id: "lien-he",
    label: "Sẵn sàng mở rộng",
    title: "Đây là bộ khung tốt để tiếp tục thêm sự kiện, forum và quy trình thành viên.",
    description:
      "Phần public đã có hướng nội dung rõ, còn khu admin đã sẵn cho việc tiếp tục thêm module quản lý và dữ liệu thật.",
    cta_label: "Mở dashboard",
    cta_url: "/admin",
  },
   footer: {
    title: "CTRL/C CLUB",
    description:
      "Nơi kết nối sinh viên yêu công nghệ thông qua dự án, workshop và văn hóa làm việc tế nhị.",
    email: "hello@ctrlcclub.com",
    address: "Phòng sinh hoạt CLB, khuôn viên trường",
    copyright: "CTRL/C CLUB. All rights reserved.",
    links: [
      { label: "Đăng nhập", href: "/login" },
      { label: "Dashboard", href: "/admin" },
      { label: "Giới thiệu", href: "/#gioi-thieu" },
    ],
  },
  typography: {
    fontFamily: {
      heading: "be-vietnam-pro",
      body: "inter",
    },
  },
};
