import { Condition, Product, NavItem } from "../types/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Consoles", href: "/consoles" },
  { label: "Games", href: "/games" },
  { label: "Accessories", href: "/accessories" },
  { label: "Sell", href: "/sell" },
];

export const PRODUCTS: Product[] = [
  {
    id: "n-switch-oled",
    name: "Nintendo Switch (OLED)",
    currentPrice: 24000,
    originalPrice: 32000,
    condition: Condition.MINT,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNF2Plo0rQyXxHjsmg7Ovz_XG8PVzUssFxap_IslpxmB8iDxNZ-7COjeVBMCEuZx_B8Zt4V7HQetfHBKlIvRL6mZzSiCnfQ5jDD2h0j5E5YSPaTNSTFVPn4mHUpKa3wekIpkLXmvfjuGXcvaEXgakzRKw_lARL0WKSW5x5BHbqZoIKcAiuPujfIYNcVLLOonquo0-ijkQiFS2AhViCMzP-9fD2ItuRnuSyDFHCJ-dXN_4ijChCrlkLEW0AK8brYW1nhWsa5xEdn60",
    statusText: "Fast PAN-India Delivery",
    statusIcon: "schedule",
  },
  {
    id: "gamecube-indigo",
    name: "GameCube (Indigo)",
    currentPrice: 8500,
    originalPrice: 11000,
    condition: Condition.GOOD,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAd2T-l8_g3apXSBp514cQpByjKEWiIwVyMek1ELt-IzcLuICUSnLcK_bm6PIQVMMdZhVxufMGkrx-mHZndgf1DEg36W6izNf-G-d_gRG5TReucWj1jJaoXbiRDLSaurTwJsPeQFCzyp5nhj5rNSKbXN9PNPAPjejnYcWq7vi45KxzKZF-c9oEF8r53amHRRrzOU26zfHeFRJzSJpksfP6Vw6cQvSt42RB2TVcccbTn1341KJf_kkuOc-iZVfM-KCKn5rIuR33ttTQ",
    statusText: "Certified Authentic",
    statusIcon: "verified",
  },
  {
    id: "ps2-slim",
    name: "PlayStation 2 (Slim)",
    currentPrice: 5800,
    originalPrice: 8000,
    condition: Condition.FAIR,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxOiwOR7I7oyNnOF3XpJEnvzlzIsFC3iDrM7xTyihkgZ95F5xUMh_zOtYicrx1eFxwxrsOKXRSJ1yS8KSzuhsdGusxeowm4EmXDO8xyAQRy5ji4er6CIsOuPkkhNmWeaM4KMFhixCAep-EJ_wOaQrhIFjLJTJEUzNFdFXYduPh6NztcyEr1mt56MyaQkmty3HosIGZTB47ZS-g6zNlrvQlBhqz2SJGoh9FDOsaN20Fpkrzc04Cbfln27amw-6R4l5xSOz6AnMLJWY",
    statusText: "Serviced Recently",
    statusIcon: "handyman",
  },
  {
    id: "xbox-series-x",
    name: "Xbox Series X",
    currentPrice: 38500,
    originalPrice: 49990,
    condition: Condition.MINT,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXwKDNU0Y6DF01FzZj6xBorPk4TzdkCvhgt-8q_RRRdpEI4D7JV5b215D5N9DsYxzFjuNW9YEWKLVsIbbAZmI7GyWBR338vNMJNB0gKAIqKVN7I5DDjKS7nKRWBOqZ2QBwDs6CaIGLO9ZBsz6vMKg3nxBS1lFGtZZQQddKVKZY6ND_FeQ5BEp7iHf9ob4--dDA-1wBrSwWEIfyTwzpVU-De20vEMrjxqTyFJM69QJwxte8KrUA5-BDndZg_SPxnmpHye_fbQiBWQs",
    statusText: "Original Box Included",
    statusIcon: "inventory_2",
  },
];
