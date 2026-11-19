// Film types: the home section, the /peliculas pages and the structured data
// (lib/schema.ts) all read this list.
// TODO(cliente): confirmar as linhas que a Light Films trabalha e, quando houver,
// acrescentar números do fabricante (rejeição de calor, UV, garantia) e marcas.
// Texto sem números e sem a marca "insulfilm" de propósito (política do Google Ads).
// Cada página usa os nomes que as pessoas buscam (película térmica, refletiva,
// fosca, antiestilhaço...) dentro do texto, sem repetir palavra-chave à toa.

export type FilmSection = {
	heading: string;
	paragraphs?: string[];
	bullets?: string[];
};

export type Film = {
	slug: string;
	name: string;
	// Name in running text, e.g. "película de segurança"
	fullName: string;
	// Short card text (home and lists)
	text: string;
	usage: string[];
	// Tint over the sample sky photo
	pane: string;
	// Mirror films also get a reflection across the window
	sheen?: boolean;
	// Page
	title: string;
	description: string;
	lead: string;
	sections: FilmSection[];
	faq: { question: string; answer: string }[];
};

export const films: Film[] = [
	{
		slug: "controle-solar",
		name: "Controle solar",
		fullName: "película de controle solar",
		text: "Barra boa parte do calor e dos raios UV sem mudar a aparência do vidro.",
		usage: ["Salas", "Escritórios"],
		pane: "bg-[rgb(28_70_80/0.14)]",
		title: "Película de controle solar para vidros em São Paulo",
		description:
			"Película de controle solar (película térmica) para janelas de casa, apartamento e escritório em São Paulo: menos calor e menos UV sem escurecer o ambiente.",
		lead: "A película de controle solar, também chamada de película térmica, diminui o calor que entra pela janela e barra boa parte dos raios UV. O ambiente fica mais fresco perto do vidro e a vista continua a mesma, sem escurecer a sala.",
		sections: [
			{
				heading: "Como ela diminui o calor",
				paragraphs: [
					"O vidro comum deixa passar quase toda a energia do sol. A película de controle solar tem camadas que refletem e absorvem parte dessa energia antes que ela chegue ao ambiente. Na prática, a mesa ao lado da janela para de esquentar e o sol da tarde incomoda bem menos.",
					"Existem versões quase transparentes e versões levemente tingidas. As claras praticamente não mudam a luz da sala. As mais escuras cortam mais calor e também reduzem o brilho.",
				],
			},
			{
				heading: "Quando vale a pena",
				bullets: [
					"Sala ou quarto que esquenta demais à tarde.",
					"Home office ou escritório com gente trabalhando perto da janela.",
					"Sofá, piso de madeira e cortina desbotando com o sol.",
					"Quem quer menos calor sem escurecer o ambiente nem mudar a fachada.",
				],
			},
			{
				heading: "Película para janela de apartamento e varanda",
				paragraphs: [
					"Em apartamento, o calor costuma vir da janela grande da sala e do vidro da varanda fechada. A película de controle solar é aplicada pelo lado de dentro, sem obra e sem tirar os vidros do lugar. Como as versões claras quase não mudam a aparência por fora, ela costuma ser a opção mais fácil de aprovar no condomínio.",
				],
			},
			{
				heading: "Proteção contra os raios UV",
				paragraphs: [
					"Os raios UV são o que desbota tecidos, madeira e quadros perto da janela. A película barra a maior parte deles, então móveis e piso duram mais com a cor original. Quem passa o dia ao lado do vidro também sente a diferença na pele.",
				],
			},
			{
				heading: "Controle solar, fumê ou espelhada?",
				paragraphs: [
					"Se o problema é só o calor, a de controle solar resolve sem mudar a aparência do vidro. Se além do calor você quer menos reflexo na TV ou no monitor, a fumê costuma funcionar melhor. Se a ideia é também ter privacidade de dia e uma fachada uniforme, a espelhada faz as duas coisas.",
					"Na visita, a gente aplica um pedaço de cada opção no seu próprio vidro para você comparar com a luz real do cômodo.",
				],
			},
		],
		faq: [
			{
				question: "A película de controle solar escurece o ambiente?",
				answer:
					"As versões claras quase não mudam a luz. Se preferir cortar mais calor, dá para escolher um tom um pouco mais escuro. Na visita você vê as amostras no próprio vidro antes de decidir.",
			},
			{
				question:
					"Película térmica e película de controle solar são a mesma coisa?",
				answer:
					"Na prática, sim. Película térmica é o nome popular da película que reduz o calor que passa pelo vidro.",
			},
			{
				question: "Dá para aplicar em apartamento?",
				answer:
					"Sim. A aplicação é feita pelo lado de dentro do vidro, sem obra. Em prédio, vale conferir se o condomínio tem regra para a fachada, principalmente para películas tingidas.",
			},
			{
				question: "Ela substitui o ar-condicionado?",
				answer:
					"Não substitui, mas ajuda: com menos calor entrando pelo vidro, o ambiente esquenta menos e o ar-condicionado faz menos esforço.",
			},
		],
	},
	{
		slug: "fume",
		name: "Fumê",
		fullName: "película fumê",
		text: "Escurece o vidro na medida certa e tira o reflexo das telas.",
		usage: ["Quartos", "Escritórios"],
		pane: "bg-[rgb(16_40_46/0.45)] backdrop-brightness-90 backdrop-saturate-75",
		title: "Película fumê para vidros em São Paulo",
		description:
			"Película fumê para janelas de casa, apartamento e escritório em São Paulo: menos claridade, menos reflexo na TV e no monitor e mais privacidade de dia.",
		lead: "A película fumê escurece o vidro no tom que você escolher. Ela tira o excesso de claridade, acaba com o reflexo do sol na TV e no monitor e dá mais privacidade durante o dia.",
		sections: [
			{
				heading: "Para que serve",
				paragraphs: [
					"A fumê é a película tingida em cinza, também conhecida como película escurecedora. Quanto mais escuro o tom, menos luz e menos calor passam pelo vidro. Ela é a escolha comum onde a claridade atrapalha: quarto que precisa de penumbra, sala de TV e escritório com sol batendo na tela do computador.",
				],
			},
			{
				heading: "Onde costuma ser aplicada",
				bullets: [
					"Janela de quarto, para dormir sem a luz direta da manhã.",
					"Sala de TV e home office perto da janela.",
					"Escritórios e recepções com fachada de vidro.",
					"Portas e janelas voltadas para a rua, para ter mais privacidade de dia.",
				],
			},
			{
				heading: "Privacidade de dia e à noite",
				paragraphs: [
					"Durante o dia, com mais luz do lado de fora, quem está dentro enxerga normalmente e quem está na rua vê pouco do interior. À noite, com a luz acesa por dentro, o efeito se inverte e o interior fica mais visível. Se você precisa de privacidade também à noite, a película jateada ou uma cortina resolvem melhor.",
				],
			},
			{
				heading: "Como escolher o tom",
				paragraphs: [
					"Tons claros tiram o brilho sem mudar muito o ambiente. Tons médios equilibram luz e conforto. Tons escuros dão mais privacidade e deixam o cômodo sombreado. O jeito mais seguro de escolher é ver no próprio vidro: na visita, a gente aplica amostras de cada tom para você comparar com a luz do seu ambiente.",
				],
			},
		],
		faq: [
			{
				question: "A película fumê deixa a casa escura?",
				answer:
					"Depende do tom. Os mais claros só tiram o excesso de luz. Os mais escuros deixam o ambiente sombreado. Por isso a gente leva amostras e aplica no seu vidro antes de fechar.",
			},
			{
				question: "Dá para ver de dentro para fora?",
				answer:
					"Sim. Durante o dia a vista continua normal de dentro. Quem fica do lado de fora vê pouco, principalmente nos tons mais escuros.",
			},
			{
				question: "Película fumê ajuda com o calor?",
				answer:
					"Ajuda, porque bloqueia parte da luz do sol. Se o calor é o principal problema e você não quer escurecer, a película de controle solar é mais indicada.",
			},
			{
				question: "Posso usar fumê em prédio?",
				answer:
					"Pode, mas em condomínio é bom conferir antes se existe regra para a fachada. Em alguns prédios o tom precisa seguir um padrão.",
			},
		],
	},
	{
		slug: "espelhada",
		name: "Espelhada",
		fullName: "película espelhada",
		text: "Reflete o sol e dá privacidade de dia, com fachada uniforme por fora.",
		usage: ["Fachadas", "Prédios"],
		pane: "bg-[rgb(186_204_216/0.34)] backdrop-brightness-[0.8] backdrop-contrast-[1.05] backdrop-saturate-[0.35]",
		sheen: true,
		title: "Película espelhada para vidros em São Paulo",
		description:
			"Película espelhada (refletiva) para fachadas, escritórios e janelas de casa em São Paulo: reflete o sol, reduz o calor e dá privacidade durante o dia.",
		lead: "A película espelhada, também chamada de película refletiva, deixa o vidro com efeito de espelho pelo lado de fora. Ela reflete boa parte do sol, diminui o calor e dá privacidade durante o dia. De dentro, a vista continua, um pouco mais escura e prateada.",
		sections: [
			{
				heading: "Como funciona o efeito espelho",
				paragraphs: [
					"A película tem uma camada metalizada que reflete a luz. O efeito espelho aparece no lado mais claro: de dia, quem está na rua vê o reflexo do céu e dos prédios em vez do interior. Quem está dentro continua enxergando a vista.",
					"À noite, com a luz acesa por dentro, o lado mais claro passa a ser o interior. Aí o efeito se inverte: de fora dá para ver o ambiente, e de dentro o vidro reflete. Para privacidade à noite, combine com cortina ou persiana.",
				],
			},
			{
				heading: "Por que escolher a espelhada",
				bullets: [
					"Reflete o sol antes que ele entre, e o ambiente esquenta menos.",
					"Privacidade durante o dia sem fechar a cortina.",
					"Fachada com aparência uniforme, mesmo com ambientes diferentes atrás de cada vidro.",
					"Menos brilho e ofuscamento perto da janela.",
				],
			},
			{
				heading: "Película espelhada para fachada e escritório",
				paragraphs: [
					"É a película mais usada em fachadas de prédios comerciais e escritórios, onde dezenas de janelas precisam ficar com o mesmo visual por fora. Ela esconde a bagunça de cada sala, segura parte do calor e dá ao prédio a aparência de vidro espelhado sem trocar os vidros.",
				],
			},
			{
				heading: "Película espelhada para janela de casa",
				paragraphs: [
					"Em casa, ela funciona bem em janelas voltadas para a rua ou para o vizinho do lado, e em salas que pegam sol forte à tarde. Durante o dia você abre a cortina e continua com privacidade. Para quarto e banheiro, onde a privacidade precisa valer também à noite, a película jateada costuma ser melhor.",
				],
			},
			{
				heading: "Antes de aplicar em prédio ou condomínio",
				paragraphs: [
					"Como a película espelhada muda a aparência da fachada, muitos condomínios têm regra sobre ela. Consulte o síndico ou o regulamento antes. Se o prédio já tem um padrão, a gente procura uma película com o mesmo visual.",
				],
			},
			{
				heading: "Espelhada, fumê ou controle solar?",
				paragraphs: [
					"Se você quer privacidade de dia e uma fachada uniforme, a espelhada é a mais indicada. Se o foco é só tirar o reflexo das telas, a fumê resolve. Se você quer menos calor sem mudar a aparência do vidro, a de controle solar é a melhor opção. Na visita a gente mostra as três no seu vidro.",
				],
			},
		],
		faq: [
			{
				question: "A película espelhada escurece por dentro?",
				answer:
					"Um pouco. De dentro, a vista fica levemente mais escura e com um tom prateado. Na visita a gente aplica uma amostra no seu vidro para você ver como fica.",
			},
			{
				question: "De noite as pessoas veem dentro de casa?",
				answer:
					"Com a luz acesa por dentro, sim: à noite o efeito espelho se inverte. Para privacidade à noite, use junto com cortina ou persiana, ou escolha a película jateada.",
			},
			{
				question: "Película refletiva e película espelhada são a mesma coisa?",
				answer:
					"Sim. Refletiva é outro nome para a película espelhada, a que reflete o sol e dá o efeito espelho pelo lado de fora.",
			},
			{
				question: "Precisa de autorização do condomínio?",
				answer:
					"Em muitos prédios, sim, porque muda a aparência da fachada. Confira o regulamento ou fale com o síndico antes de agendar.",
			},
			{
				question: "Quanto tempo leva a aplicação?",
				answer:
					"Uma casa ou um escritório pequeno costuma ficar pronto no mesmo dia. Fachadas e obras maiores têm o prazo combinado no orçamento.",
			},
		],
	},
	{
		slug: "jateada",
		name: "Jateada",
		fullName: "película jateada",
		text: "Deixa o vidro fosco: passa luz, mas não dá para ver através.",
		usage: ["Banheiros", "Divisórias"],
		pane: "bg-white/45 backdrop-blur-md",
		title: "Película jateada para vidros em São Paulo",
		description:
			"Película jateada (fosca) para box de banheiro, divisórias e portas de vidro em São Paulo: privacidade de dia e de noite sem perder a luz natural.",
		lead: "A película jateada, também chamada de película fosca, deixa o vidro com aparência de vidro jateado. A luz continua passando, mas não dá para ver o que está do outro lado, de dia e de noite.",
		sections: [
			{
				heading: "Privacidade o tempo todo",
				paragraphs: [
					"As películas fumê e espelhada dependem da luz para esconder o interior. A jateada é fosca dos dois lados, então a privacidade continua à noite, com a luz acesa. É a mais indicada quando o vidro precisa esconder o ambiente o tempo todo.",
				],
			},
			{
				heading: "Onde costuma ser aplicada",
				bullets: [
					"Box e janela de banheiro.",
					"Divisórias de vidro em escritórios e salas de reunião.",
					"Portas de vidro entre ambientes, como cozinha e lavanderia.",
					"Janelas voltadas para vizinhos muito próximos.",
				],
			},
			{
				heading: "Película para box de banheiro",
				paragraphs: [
					"O box de vidro transparente é um dos pedidos mais comuns. A película jateada é aplicada pelo lado de fora do box, longe da água do banho, e deixa o vidro fosco do chão até a altura que você escolher. O banheiro continua claro e a limpeza é a mesma de antes: pano macio, água e sabão neutro.",
				],
			},
			{
				heading: "Inteira ou em faixas",
				paragraphs: [
					"Dá para cobrir o vidro inteiro ou só uma faixa na altura dos olhos, deixando a parte de cima livre para entrar mais luz e manter um pouco da vista. Em escritórios, a película também pode ser recortada com formas ou com o nome da empresa.",
				],
			},
			{
				heading: "Mais simples que trocar o vidro",
				paragraphs: [
					"O efeito visual é o mesmo do vidro jateado, sem trocar o vidro nem fazer obra. E, se um dia você mudar o uso do ambiente, a película pode ser removida.",
				],
			},
		],
		faq: [
			{
				question: "A película jateada escurece o ambiente?",
				answer:
					"Pouco. Ela espalha a luz em vez de bloquear, então o ambiente continua claro. O que muda é que não dá para ver através.",
			},
			{
				question: "Pode aplicar em box de banheiro?",
				answer:
					"Pode. A aplicação é feita pelo lado de fora do box, e a limpeza continua simples: pano macio, água e sabão neutro.",
			},
			{
				question: "Película fosca e película jateada são a mesma coisa?",
				answer:
					"Sim. Fosca é o nome popular da película jateada, a que deixa o vidro opaco e deixa a luz passar.",
			},
			{
				question: "Dá para fazer só uma faixa no vidro?",
				answer:
					"Sim. É comum aplicar uma faixa na altura dos olhos e deixar o resto do vidro transparente. A gente mede e combina a altura na visita.",
			},
		],
	},
	{
		slug: "seguranca",
		name: "Segurança",
		fullName: "película de segurança",
		text: "Película mais grossa que segura os estilhaços se o vidro quebrar.",
		usage: ["Vitrines", "Portas"],
		pane: "bg-[rgb(200_220_230/0.12)]",
		title: "Película de segurança para vidros em São Paulo",
		description:
			"Película de segurança (antiestilhaço) para vitrines, portas e janelas em São Paulo: segura os cacos se o vidro quebrar e dificulta a entrada pelo vidro.",
		lead: "A película de segurança, também chamada de película antiestilhaço, é mais grossa e resistente que as outras. Se o vidro quebrar, os cacos ficam presos nela em vez de se espalharem. Isso reduz o risco de cortes e dificulta a passagem de quem tenta entrar pelo vidro.",
		sections: [
			{
				heading: "Para que serve",
				paragraphs: [
					"Vidro comum, quando quebra, solta pedaços pontudos para todos os lados. A película de segurança mantém os cacos colados, como acontece em um para-brisa. Quem está perto fica protegido e o vidro quebrado continua no lugar até ser trocado.",
				],
			},
			{
				heading: "Onde costuma ser aplicada",
				bullets: [
					"Vitrines e portas de lojas.",
					"Portas e janelas de vidro em casas com crianças ou animais.",
					"Divisórias e vidros grandes em corredores e áreas de circulação.",
					"Janelas térreas ou de fácil acesso pela rua.",
				],
			},
			{
				heading: "Película antiestilhaço para casa",
				paragraphs: [
					"Em casa, ela é mais pedida para porta de vidro da sala, box e janelas baixas, onde uma bola, um tropeço ou um animal podem quebrar o vidro. Com a película, o vidro trinca mas os cacos não caem no chão, o que evita cortes até a troca.",
				],
			},
			{
				heading: "O que ela não faz",
				paragraphs: [
					"A película de segurança não deixa o vidro inquebrável e não substitui um vidro laminado ou temperado onde a norma exige esse tipo de vidro. Ela aumenta a proteção do vidro que você já tem. Na visita a gente avalia o vidro e diz se a película é suficiente para o seu caso.",
				],
			},
			{
				heading: "Pode ser combinada com outras",
				paragraphs: [
					"Existem películas de segurança transparentes, que não mudam a aparência do vidro, e versões com tom fumê ou de controle solar, que somam menos calor e mais privacidade à proteção.",
				],
			},
		],
		faq: [
			{
				question: "A película de segurança é visível?",
				answer:
					"A versão transparente quase não aparece. Também existem versões com tom, se você quiser somar privacidade ou controle de calor.",
			},
			{
				question: "Ela impede que o vidro quebre?",
				answer:
					"Não. Ela segura os cacos quando o vidro quebra e dificulta a passagem, mas o vidro continua podendo trincar.",
			},
			{
				question: "Película antiestilhaço é o mesmo que película de segurança?",
				answer:
					"Sim. Antiestilhaço é outro nome para a película de segurança, a que segura os cacos quando o vidro quebra.",
			},
			{
				question: "Serve para vitrine de loja?",
				answer:
					"Sim, é um dos usos mais comuns: protege quem passa na calçada e dificulta a entrada pelo vidro.",
			},
		],
	},
	{
		slug: "decorativa",
		name: "Decorativa",
		fullName: "película decorativa",
		text: "Faixas, recortes e desenhos para identificar ambientes e marcar vidros.",
		usage: ["Lojas", "Recepções"],
		pane: "bg-[repeating-linear-gradient(0deg,transparent_0_18px,rgb(255_255_255/0.55)_18px_26px)] backdrop-blur-[2px]",
		title: "Película decorativa para vidros em São Paulo",
		description:
			"Película decorativa para portas, divisórias e vitrines em São Paulo: faixas de sinalização, padrões e recortes com o nome da empresa no vidro.",
		lead: "A película decorativa usa faixas, padrões e recortes para deixar o vidro mais bonito e mais fácil de ver. Ela marca portas de vidro, identifica salas e coloca o nome da empresa no vidro, sem trocar nada.",
		sections: [
			{
				heading: "Para que serve",
				bullets: [
					"Marcar portas e paredes de vidro para ninguém bater de frente.",
					"Identificar salas, recepções e ambientes de escritório.",
					"Dar privacidade parcial com faixas ou padrões.",
					"Decorar vitrines e fachadas de lojas.",
				],
			},
			{
				heading: "Faixa de sinalização para porta de vidro",
				paragraphs: [
					"Porta e parede de vidro muito limpas quase desaparecem, e é comum alguém bater de frente. Uma faixa na altura dos olhos resolve isso de um jeito discreto. Ela pode ser jateada, lisa ou com um padrão que combine com o ambiente.",
				],
			},
			{
				heading: "Nome da empresa e recortes no vidro",
				paragraphs: [
					"Em escritórios e lojas, é comum recortar o nome ou a marca na própria película, ou criar listras, degradês e formas. Na visita, a gente mostra as opções e combina o desenho, o tamanho e a posição.",
				],
			},
			{
				heading: "Fácil de trocar",
				paragraphs: [
					"Como é uma película, o desenho pode ser removido e trocado depois, numa mudança de layout do escritório ou de identidade da loja, sem mexer no vidro.",
				],
			},
		],
		faq: [
			{
				question: "Dá para colocar o nome da empresa no vidro?",
				answer:
					"Sim. A película pode ser recortada com letras e formas. Chame a gente no WhatsApp com a ideia e a medida do vidro.",
			},
			{
				question: "A película decorativa sai depois?",
				answer: "Sai. Ela pode ser removida e trocada sem danificar o vidro.",
			},
			{
				question: "Serve para divisória de escritório?",
				answer:
					"Serve, e é um dos usos mais comuns: identifica a sala, marca o vidro e pode dar privacidade com uma faixa fosca.",
			},
		],
	},
];

// Shown on every film page: what changes the price, without inventing numbers.
// TODO(cliente): confirmar se a visita é grátis e acrescentar aqui.
export const priceFactors = [
	"O tamanho total dos vidros, em metros quadrados.",
	"O tipo de película escolhido.",
	"A altura e o acesso, como vidro alto que precisa de escada ou andaime.",
	"A quantidade de peças e o formato dos vidros.",
	"Se é preciso tirar uma película antiga antes.",
];

export function getFilm(slug: string) {
	return films.find((film) => film.slug === slug) ?? null;
}
