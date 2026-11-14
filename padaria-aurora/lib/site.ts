export const site = {
  name: "Padaria Aurora",
  origin: "https://padaria-aurora-feito-com-tempo.boiledsunbird3.chatgpt.site",
  description: "Pães de fermentação natural, café passado com cuidado e tempo para ficar. Conheça a Padaria Aurora, um projeto fictício de padaria artesanal.",
  tagline: "Feito com tempo. Servido com carinho.",
  address: { street: "Rua das Amendoeiras, 128", neighborhood: "Bairro Jardim do Sol", city: "Cidade fictícia · Brasil" },
  hours: [{ days: "Segunda a sexta", time: "7h às 19h" }, { days: "Sábado", time: "7h às 18h" }, { days: "Domingo e feriados", time: "8h às 13h" }],
  contacts: { whatsapp: "", instagram: "" },
  demoNotice: "Projeto demonstrativo de portfólio. A Padaria Aurora é uma empresa fictícia.",
};
export function safeSocialUrl(value: string, kind: "whatsapp" | "instagram"): string | null {
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" || u.username || u.password || u.port) return null;
    if (kind === "whatsapp" && u.hostname === "wa.me" && /^\/[1-9]\d{9,14}\/?$/.test(u.pathname)) return u.href;
    if (kind === "instagram" && ["instagram.com", "www.instagram.com"].includes(u.hostname) && /^\/[a-zA-Z0-9_.]{1,30}\/?$/.test(u.pathname)) return u.href;
    return null;
  } catch { return null; }
}
