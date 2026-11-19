// Film types: the home section and the structured data (lib/schema.ts) read the same list
// TODO(cliente): confirmar quais linhas de película a Light Films trabalha
export const films = [
	{
		name: "Controle solar",
		text: "Barra boa parte do calor e dos raios UV sem mudar a aparência do vidro.",
		usage: ["Salas", "Escritórios"],
		pane: "bg-[rgb(28_70_80/0.14)]",
	},
	{
		name: "Fumê",
		text: "Escurece o vidro na medida certa e tira o reflexo das telas.",
		usage: ["Quartos", "Escritórios"],
		pane: "bg-[rgb(16_40_46/0.45)] backdrop-brightness-90 backdrop-saturate-75",
	},
	{
		name: "Espelhada",
		text: "Reflete o sol e dá privacidade de dia, com fachada uniforme por fora.",
		usage: ["Fachadas", "Prédios"],
		pane: "bg-[linear-gradient(135deg,rgb(226_236_239/0.85),rgb(120_150_160/0.65)_45%,rgb(232_240_242/0.8)_62%,rgb(140_165_172/0.7))] backdrop-brightness-75",
	},
	{
		name: "Jateada",
		text: "Deixa o vidro fosco: passa luz, mas não dá para ver através.",
		usage: ["Banheiros", "Divisórias"],
		pane: "bg-white/45 backdrop-blur-md",
	},
	{
		name: "Segurança",
		text: "Película mais grossa que segura os estilhaços se o vidro quebrar.",
		usage: ["Vitrines", "Portas"],
		pane: "bg-[rgb(200_220_230/0.12)]",
	},
	{
		name: "Decorativa",
		text: "Faixas, recortes e desenhos para identificar ambientes e marcar vidros.",
		usage: ["Lojas", "Recepções"],
		pane: "bg-[repeating-linear-gradient(0deg,transparent_0_18px,rgb(255_255_255/0.55)_18px_26px)] backdrop-blur-[2px]",
	},
];
