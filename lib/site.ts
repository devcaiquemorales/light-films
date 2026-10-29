// Site-wide constants (contact info, navigation)
export const site = {
	name: "Light Films",
	url: "https://light-films.vercel.app",
	slogan: "Proteção e Estilo em um lugar: Película Arquitetônica de Qualidade",
	phone: "(11) 4259-3003",
	phoneHref: "tel:+551142593003",
	whatsappNumber: "5511981696933",
	facebook: "https://www.facebook.com/vagnermmorales/",
};

export const navLinks = [
	{ name: "Início", id: "inicio" },
	{ name: "Atuação", id: "atuacao" },
	{ name: "Benefícios", id: "beneficios" },
	{ name: "Projetos", id: "projetos" },
	{ name: "Clientes", id: "clientes" },
	{ name: "Contato", id: "contato" },
];

export function whatsappLink(message: string) {
	return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
