// Site-wide constants (contact info, navigation)
export const site = {
	name: "Light Films",
	// Official domain: canonical URLs, sitemap, robots and share links
	url: "https://light-films.com",
	slogan: "Proteção e Estilo em um lugar: Película Arquitetônica de Qualidade",
	// Company ID shown in the footer and privacy policy (ads and LGPD ask for it).
	// No street address on purpose: service-area business, no walk-in clients.
	cnpj: "17.101.943/0001-03",
	// Contact for privacy requests (LGPD)
	email: "light-films@hotmail.com",
	// Main number for calls and WhatsApp, the same as the Google Business Profile
	phone: "(11) 98169-6933",
	phoneHref: "tel:+5511981696933",
	// Secondary landline, still answered
	landline: "(11) 4259-3003",
	landlineHref: "tel:+551142593003",
	whatsappNumber: "5511981696933",
	facebook: "https://www.facebook.com/vagnermmorales/",
};

export const siteDescription =
	"Película para vidros de casas, escritórios, lojas e prédios em São Paulo. Menos calor, proteção UV e mais privacidade, sem trocar a janela.";

export const navLinks = [
	{ name: "Benefícios", id: "beneficios" },
	{ name: "Películas", id: "peliculas" },
	{ name: "Projetos", id: "projetos" },
	{ name: "Como funciona", id: "como-funciona" },
	{ name: "Dúvidas", id: "duvidas" },
	{ name: "Contato", id: "contato" },
];

export const quoteMessage =
	"Olá! Vim pelo site e gostaria de um orçamento de película.";

export function whatsappLink(message: string) {
	return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
