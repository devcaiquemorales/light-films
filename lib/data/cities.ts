// Area served: São Paulo and every city of the Região Metropolitana de São Paulo
// (39 municipalities). Feeds the structured data, the FAQ and llms.txt.
export const cities = [
	"São Paulo",
	"Arujá",
	"Barueri",
	"Biritiba-Mirim",
	"Caieiras",
	"Cajamar",
	"Carapicuíba",
	"Cotia",
	"Diadema",
	"Embu das Artes",
	"Embu-Guaçu",
	"Ferraz de Vasconcelos",
	"Francisco Morato",
	"Franco da Rocha",
	"Guararema",
	"Guarulhos",
	"Itapecerica da Serra",
	"Itapevi",
	"Itaquaquecetuba",
	"Jandira",
	"Juquitiba",
	"Mairiporã",
	"Mauá",
	"Mogi das Cruzes",
	"Osasco",
	"Pirapora do Bom Jesus",
	"Poá",
	"Ribeirão Pires",
	"Rio Grande da Serra",
	"Salesópolis",
	"Santa Isabel",
	"Santana de Parnaíba",
	"Santo André",
	"São Bernardo do Campo",
	"São Caetano do Sul",
	"São Lourenço da Serra",
	"Suzano",
	"Taboão da Serra",
	"Vargem Grande Paulista",
];

// "A, B e C" for running text
export function listCities(names: string[]) {
	return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}
