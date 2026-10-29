# Light Films — Análise do Projeto

> Documento vivo. Referência central para a modernização do site.
> Análise feita em 29/10/2026 sobre o commit `f1ea430` (branch `main`).
> Última atualização: 29/10/2026 — **Fases 1–3 concluídas.** Plano revisado: **Fase 4 agora é UI/redesign**; o backend passa a ser **Convex + Cloudflare R2** (Fase 5), substituindo o protótipo em Payload. As seções 4–9 descrevem o estado **antes** da Fase 1.


> ⚠️ **REGRA: NUNCA enviar o formulário de contato (nem qualquer e-mail/mensagem) em testes.**
> O EmailJS está ligado ao e-mail **real do cliente**. Um envio de teste chega para ele como se fosse um cliente de verdade.
> Não clicar em "Enviar", não chamar `emailjs.send*`, não disparar o link do WhatsApp em testes. Validar só build, tipos, layout e comportamento **antes** do envio.
> Testes de envio só com um serviço/destino de teste próprio (ex.: template EmailJS apontando para o nosso e-mail ou Resend em modo teste), configurado por variável de ambiente, e com autorização explícita.
---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [O cliente](#2-o-cliente)
3. [Histórico do projeto](#3-histórico-do-projeto)
4. [Stack atual](#4-stack-atual)
5. [Estrutura do código](#5-estrutura-do-código)
6. [Funcionalidades atuais](#6-funcionalidades-atuais)
7. [As 7 ferramentas (hooks em `utils/`)](#7-as-7-ferramentas-hooks-em-utils)
8. [Bugs e quebras de UI](#8-bugs-e-quebras-de-ui)
9. [Problemas técnicos e de segurança](#9-problemas-técnicos-e-de-segurança)
10. [SEO e performance](#10-seo-e-performance)
11. [Conteúdo](#11-conteúdo)
12. [Backend / painel do cliente](#12-backend--painel-do-cliente)
13. [Roadmap](#13-roadmap)
14. [Checklist geral](#14-checklist-geral)
15. [Decisões](#15-decisões)

---

## 1. Visão geral

**Light Films** é o site institucional de uma empresa que aplica **películas arquitetônicas (insulfilm)** em vidros de residências, escritórios, comércios e prédios, na região de São Paulo.

**Objetivo do site:**
- Apresentar a empresa, os serviços e os benefícios do insulfilm (menos calor, proteção UV, privacidade, segurança).
- Mostrar o portfólio de projetos realizados (Senai, Sabesp, Porto Seguro).
- Gerar contatos (leads) pelo formulário de e-mail e pelo WhatsApp.

**Situação atual:** o site continua no ar e em uso (`https://light-films.vercel.app/`), mas não recebe manutenção desde abril de 2024. A UI está datada e tem quebras, e **não existe nenhum backend**. Para adicionar um projeto novo é preciso que um desenvolvedor edite o código e faça deploy.

## 2. O cliente

| Item | Informação |
|---|---|
| Nome | Light Films |
| Segmento | Aplicação de película/insulfilm arquitetônico |
| Região | São Paulo (telefone com DDD 11) |
| Telefone fixo | (11) 4259-3003 |
| WhatsApp | +55 11 98169-6933 |
| Facebook | `facebook.com/vagnermmorales` (perfil pessoal, não uma página da empresa) |
| Clientes atendidos (portfólio) | Senai, Sabesp, Porto Seguro (Ateliê está comentado no código) |
| Perfil técnico | **Pouco técnico.** Não tem familiaridade com computadores e ferramentas. |

**Implicação principal:** qualquer painel administrativo precisa ser **extremamente simples**, **100% em português** e com o mínimo possível de campos e telas.

## 3. Histórico do projeto

- **Ago/2023:** desenvolvimento inicial (seções, contato com EmailJS, SEO básico, páginas de projetos) e deploy na Vercel.
- **Set–Nov/2023:** ajustes de texto (Hero, Footer).
- **Abr/2024:** adição do `sharp`, novos projetos, telefone fixo e correção do slider. Último commit.
- Feito numa época em que o uso de IA no desenvolvimento era mínimo (Tabnine), o que explica muito código repetido e copiado.

## 4. Stack atual

| Tecnologia | Versão | Observação |
|---|---|---|
| Next.js (App Router) | 13.4.12 | **Fora de suporte**, com vulnerabilidades conhecidas |
| React | 18.2 | |
| TypeScript | 5.1 | `strict` ligado, mas há vários `any` |
| Tailwind CSS | 3.3 | Fontes fluidas (`clamp`), cores `primary-500 #243c5a` e `primary-400 #1b3748` |
| Swiper | 10 | Sliders |
| @emailjs/browser | 3 | Formulário de contato (chaves no client) |
| sharp | 0.33 | Otimização de imagens |
| lucide-react | 0.263 | Instalado, **não usado** |
| Fonte | Montserrat | via `next/font/google` |
| Hospedagem | Vercel | |

- O README cita **Styled Components**, mas ele não é usado.
- Existem dois lockfiles: `package-lock.json` (versionado) e `bun.lock` (não versionado).
- Não há ESLint configurado, testes nem CI.

## 5. Estrutura do código

```
app/
  layout.tsx                 # layout raiz, metadata de SEO, Header + Footer
  page.tsx                   # home: monta as seções
  globals.css
  (home)/
    Hero/                    # banner principal
    Occupation/ (+Item)      # áreas de aplicação (4 cards)
    Benefits/                # texto + imagem
    Projects/                # slider de projetos (hardcoded)
    Testimonials/ (+data.ts) # 3 depoimentos
    Contact/ (Form, Modal)   # formulário EmailJS + modal de sucesso
  projetos/
    page.tsx                 # grid de projetos
    [id]/page.tsx            # fotos de um projeto
    (components)/Project     # card do grid
    (components)/Swiper      # NÃO usado (comentado)
components/
  Header/ (Logo, Menu, MenuItem, data.ts, type.ts)  # menu mobile com Context
  Footer/  Section/  Title/  Button/  Whatsapp/
utils/                       # 7 hooks (ver seção 7)
public/
  data/data.ts               # ProjectsData — fonte dos projetos (exposta publicamente!)
  projects/<slug>/*.jpg      # fotos dos projetos
  testimonials/*.png
  *.png / *.jpg              # imagens das seções (~6 MB no total)
```

**Rotas geradas no build:**

| Rota | Tipo | First Load JS |
|---|---|---|
| `/` | estática | 121 kB |
| `/projetos` | estática | 89 kB |
| `/projetos/[id]` | dinâmica (SSR) | 83 kB |

## 6. Funcionalidades atuais

- **Header:** logo em texto e menu de âncoras (Home, Atuação, Benefícios, Projetos, Clientes, Contato). No mobile vira um menu lateral com overlay.
- **Hero:** imagem de fundo, título, subtítulo e botão "Ver mais".
- **Áreas de aplicação:** Residências, Escritório, Comércios e Prédios, com zoom no hover.
- **Benefícios:** texto corrido e uma imagem.
- **Nossos projetos:** slider com autoplay e botão "Ver todos projetos".
- **Depoimentos:** 3 cards.
- **Contato:** formulário (nome, celular com máscara, e-mail, mensagem) enviado via EmailJS, com modal de sucesso.
- **WhatsApp:** botão flutuante pulsando.
- **Footer:** nome, slogan, Facebook, telefone e crédito do desenvolvedor.
- **/projetos:** grid de cards. **/projetos/[slug]:** grid de fotos.

## 7. As 7 ferramentas (hooks em `utils/`)

São cópias da biblioteca *usehooks-ts*.

| Hook | Uso | Situação |
|---|---|---|
| `useEventListener` | base do `useOnClickOutside` | OK |
| `useOnClickOutside` | fecha o menu mobile ao clicar fora | OK |
| `useIsomorphicLayoutEffect` | usado pelo `useEventListener` | OK |
| `useIsFirstRender` | usado pelo `useUpdateEffect` | OK |
| `useUpdateEffect` | alterna a classe `body.menu-open` | Frágil: `classList.toggle` pode sair de sincronia com o estado |
| `useMediaQuery` | — | **Não usado** |
| `useScrollTo` | rolagem até as seções | **Não é um hook** (é chamado dentro de handlers). Usa `setTimeout` e **soma** 50px em vez de descontar a altura do header |

**Recomendação:** remover tudo. CSS (`scroll-margin-top`, `scroll-behavior`), links `#ancora` nativos e o componente **Sheet do shadcn/ui** para o menu mobile substituem os 7 hooks (ver Fase 2 da seção 13).

## 8. Bugs e quebras de UI

Verificados rodando o build de produção (desktop 1280px e mobile 375px).

| # | Problema | Onde | Gravidade |
|---|---|---|---|
| 1 | **Menu não funciona fora da home.** Em `/projetos`, clicar em "Atuação", "Contato" etc. não faz nada porque as seções não existem na página. | `components/Header/MenuItem` | Alta |
| 2 | **Títulos estouram a largura no mobile.** As barras decorativas `w-[50vw]` passam da tela (484px num viewport de 375px). O problema é mascarado por `overflow-x-hidden` no `<html>`. | `components/Title` | Média |
| 3 | **Projeto inexistente retorna 200** com o texto "No project", sem página 404. | `app/projetos/[id]/page.tsx` | Média |
| 4 | **Descrição do projeto comentada:** a página do projeto mostra só fotos, sem texto. | `app/projetos/[id]/page.tsx` | Média |
| 5 | **Slider da home é hardcoded e duplicado** (3 slides repetidos 2×), não lê `ProjectsData` e deixa um vão grande no mobile. | `app/(home)/Projects` | Média |
| 6 | **Body sem cor de fundo explícita.** Num browser em modo escuro, a seção Projetos ficou preta com o título azul-escuro ilegível. | `app/globals.css` | Média |
| 7 | **Formulário sem feedback de erro, sem loading e com envio duplo possível.** O erro vai só para o `console.log`. | `app/(home)/Contact/Form` | Alta (perde lead) |
| 8 | **`user-select: none` em tudo:** ninguém consegue copiar o telefone ou o e-mail. | `app/globals.css` | Média |
| 9 | **`outline: none` em inputs e botões:** sem foco visível, ruim para acessibilidade e teclado. | `app/globals.css` | Média |
| 10 | **Setas do slider são `<img onClick>`**: não são acessíveis por teclado nem leitor de tela. | `Projects`, `projetos/(components)/Swiper` | Baixa |
| 11 | **`Button` lança erro (`invariant`) se não receber `navigate`**, então o modo `onClick` nunca funciona. | `components/Button` | Baixa |
| 12 | `<a>` sem `href` no footer; imagens do `map` sem `key`; string solta `'Cache-Control...'` no meio do arquivo. | vários | Baixa |
| 13 | O Hero usa `h-[100vh]` com `mt-[-5rem]`; no mobile, `100vh` não considera a barra do navegador (usar `100svh`). | `app/(home)/Hero` | Baixa |

> **Verificado (29/10/2026):** as fotos de `/projetos/senai` que pareciam não carregar eram um artefato do browser de teste (lazy-load disparado só após rolar). Depois de rolar a página, as 12 fotos carregam normalmente. Não é bug.

**Visual geral:** paleta monocromática (azul-escuro chapado), sem hierarquia visual forte, layout genérico de template, logo apenas em texto, sem fotos reais da equipe nem do trabalho no Hero, e textos longos e justificados.

## 9. Problemas técnicos e de segurança

- **`npm audit` (29/10/2026): 15 vulnerabilidades, sendo 2 críticas, 10 altas e 3 moderadas.** O Next 13.4 está fora de suporte. **Prioridade técnica nº 1.**
- **Chaves do EmailJS no client** (`service_zgdcyfm`, `template_crknyff` e a public key), sem captcha nem rate limit, o que expõe o formulário a spam.
- **`public/data/data.ts` é servido publicamente** (`GET /data/data.ts` retorna 200). Dados não devem ficar em `public/`.
- `MenuItem` importa `next/router` (Pages Router) dentro do App Router (import morto).
- Dependências mortas: `lucide-react` e o componente `Swiper` comentado.
- Uso de `any` em refs e handlers.
- Dois lockfiles: escolher um (npm ou bun).
- Sem testes, sem lint e sem CI.

## 10. SEO e performance

**SEO**
- O canonical aponta para `light-films.vercel.app`. Se houver domínio próprio, ajustar; se não houver, vale comprar um.
- Faltam `sitemap.xml`, imagem Open Graph, `generateMetadata` por projeto e dados estruturados (`LocalBusiness` com endereço, telefone e área atendida).
- Faltam páginas por serviço e região (ex.: "Insulfilm residencial em São Paulo"), que são o principal canal de SEO local.
- O footer não tem endereço, CNPJ, Instagram nem Google Meu Negócio.

**Performance**
- Imagem do Hero em background CSS, sem otimização (`next/image` com `priority` resolve).
- PNGs de 100–800 KB nas seções: converter para AVIF/WebP.
- O Swiper carrega CSS de módulos não usados (scrollbar, pagination).
- A página de projeto é renderizada no servidor a cada acesso (SSR); deveria ser estática/ISR.

## 11. Conteúdo

- **Descrições copiadas e coladas:** Senai e Sabesp têm o mesmo texto, que fala de uma "famosa loja de roupas". O conteúdo não corresponde aos projetos.
- **Depoimentos com cara de fictícios** ("João Silva", "Ana Oliveira", "Marcos Santos,", este último com vírgula sobrando). Prejudica a credibilidade; substituir por depoimentos reais ou por avaliações do Google.
- Erros de concordância: "Película Arquitetônico" (Hero), "Benefícios da Películas" (Benefícios), "Insufilm" (keywords).
- Textos longos e genéricos em Benefícios e Contato; trocar por bullets objetivos.
- Falta conteúdo que converte: tipos de película, perguntas frequentes, garantia, processo de trabalho, fotos de antes/depois e área de atendimento.

## 12. Backend / painel do cliente

### 12.1 O problema

Hoje, para publicar um projeto novo, alguém precisa:
1. copiar as fotos para `public/projects/<slug>/`;
2. editar `public/data/data.ts` à mão;
3. fazer commit e deploy.

O cliente não tem como fazer isso. Na prática, o portfólio fica parado.

### 12.2 Requisitos (definidos com base no perfil do cliente)

- **100% em português**, incluindo botões, mensagens de erro e e-mails.
- **Mínimo de campos.** Um projeto é só:
  - **Título** (ex.: "Sabesp – Unidade Centro")
  - **Foto de capa (thumb)**
  - **Texto:** o que foi feito no projeto (campo de texto simples, não um editor "estilo Word")
  - **Fotos** (várias, arrastar e soltar)
  - *(automático)* data de publicação
- **Nada de "cara de WordPress":** sem menus laterais cheios de opções, sem blocos, sem configurações técnicas.
- **Funcionar bem no celular:** o cliente provavelmente vai tirar a foto na obra e publicar dali mesmo.
- **Seguro:** login com e-mail e senha, e só ele (e o desenvolvedor) têm acesso.
- **Difícil de quebrar:** imagens redimensionadas e comprimidas automaticamente, e campos obrigatórios com mensagens claras.

### 12.3 No site público: modal simples por projeto

Na seção de projetos, cada card abre um **modal** com:
- título;
- texto curto explicando o que foi feito ("Aplicamos película X nas fachadas para reduzir o calor…");
- galeria de fotos com navegação (deslizar no celular);
- botão "Quero um orçamento parecido", que abre o WhatsApp com mensagem pronta citando o projeto.

Isso substitui (ou complementa) a página `/projetos/[slug]`, que hoje só tem fotos. A rota pode continuar existindo para SEO e compartilhamento: o modal abre por cima e a URL muda (padrão *intercepting routes* do Next).

### 12.4 Opções de painel

#### Opção A — Payload CMS enxuto (recomendada)

O Payload roda **dentro do próprio projeto Next** (sem servidor separado) e já vem com login, upload, redimensionamento de imagens e banco de dados.

**A preocupação com a "cara de WordPress":** o painel padrão do Payload realmente mostra mais coisas do que o cliente precisa. Mas ele é muito configurável, então dá para deixá-lo do jeito descrito acima:

- **Idioma:** o Payload tem tradução oficial para português (`pt`). Basta definir como idioma padrão e único; todos os botões e mensagens ficam em português.
- **Uma única coleção visível: "Projetos"**, com os 4 campos (título, capa, texto, fotos). Labels e textos de ajuda escritos por nós (ex.: *"Escreva em poucas frases o que foi feito neste projeto"*).
- **Texto como `textarea` simples**, sem o editor rico (Lexical). É o editor rico que dá a sensação de "Word/WordPress".
- **Esconder o resto:** usuários, mídia e configurações ficam ocultos do cliente (`admin.hidden`) e visíveis só para o desenvolvedor.
- **Tela inicial personalizada:** em vez do dashboard padrão, um painel com dois botões grandes, "➕ Novo projeto" e "📋 Meus projetos".
- **Publicação:** um interruptor "Mostrar no site" (rascunho/publicado) e, ao salvar, o site é atualizado na hora (revalidação).

**Prós:** login, upload, segurança e banco já resolvidos; dá para crescer depois (depoimentos, leads, textos do site) sem reescrever nada.
**Contras:** projeto mais pesado; exige banco (Postgres: Neon ou Supabase, que têm plano grátis) e storage de imagens (Vercel Blob ou S3).

#### Opção B — Painel próprio, sob medida

Uma página `/painel` feita do zero, com login (Supabase Auth ou Auth.js), um formulário de projeto e uma lista com editar/excluir. Imagens no Supabase Storage ou no Vercel Blob.

**Prós:** a interface mais simples possível, 100% do nosso jeito.
**Contras:** temos que construir e manter login, upload, redimensionamento, validação, permissões e segurança. Mais código, mais pontos de falha, mais tempo.

#### Comparação

| Critério | A — Payload enxuto | B — Painel próprio |
|---|---|---|
| Simplicidade para o cliente | Alta (após customização) | Muito alta |
| Português | Tradução oficial + nossos labels | Escrito por nós |
| Tempo de desenvolvimento | Menor | Maior |
| Segurança (login, upload) | Pronta e testada | Responsabilidade nossa |
| Evolução futura | Fácil (novas coleções) | Cada recurso é código novo |
| Custo mensal | ~R$ 0 nos planos grátis | ~R$ 0 nos planos grátis |

**Decisão original (29/10/2026):** ~~Opção A — Payload enxuto~~, com o painel bem simples (só "Projetos", texto simples, tela inicial customizada, 100% em português). Antes de ir para produção, montar um protótipo da coleção "Projetos" e validar com o cliente. Se ele ainda achar complicado, a Opção B continua viável e os dados migram fácil.

**Decisão revisada (29/10/2026):** ✅ **Opção B — painel próprio**, com **Convex** (banco + backend + login) e **Cloudflare R2** (fotos). O protótipo em Payload serviu para validar a experiência do cliente (campos, tela inicial, permissões) e esse desenho é reaproveitado no painel próprio. Detalhes na seção 12.6.

### 12.5 Além dos projetos (fases futuras, opcionais)

- **Contatos recebidos (leads):** o formulário do site salva cada contato no banco **e** envia e-mail (via Resend), então nenhum lead se perde. O cliente vê a lista no painel.
- **Depoimentos:** cadastrar e aprovar depoimentos.
- **Informações da empresa:** telefone, WhatsApp e redes sociais editáveis sem código.
- **Manual do cliente:** um PDF ou página curta com prints mostrando "como publicar um projeto em 3 passos".

### 12.6 Arquitetura do backend: Convex + Cloudflare R2

**Por que não dá para manter o Payload:** o Payload só funciona com MongoDB, Postgres ou SQLite. Com Convex como banco, o painel precisa ser nosso — o que combina com o requisito de simplicidade (seção 12.2), já que a interface fica 100% sob nosso controle e feita com os mesmos componentes shadcn/ui do site.

| Peça | Responsável |
|---|---|
| Banco de dados (projetos, usuários, leads, depoimentos) | **Convex** (tabelas tipadas em `convex/schema.ts`) |
| Regras de negócio e permissões | **Convex** queries/mutations (checagem de papel admin/cliente em cada função) |
| Login do painel | **Convex Auth** (e-mail + senha) |
| Fotos | **Cloudflare R2** via componente oficial `@convex-dev/r2` (upload direto do navegador com URL assinada; o Convex guarda só a referência) |
| Compressão das fotos | No navegador antes do upload (redimensionar para máx. 2400px, WebP) — foto de celular não sobe com vários MB |
| Entrega das fotos | Domínio público do R2 (ou custom domain na Cloudflare) + `next/image` |
| Site público | Next.js lê do Convex no servidor (`fetchQuery`) — páginas continuam estáticas para SEO |
| Atualizar o site ao publicar | Mutation no Convex chama uma rota de revalidação do Next (com segredo) → `revalidatePath` |
| Formulário de contato | Mutation no Convex salva o lead + action envia e-mail (**Resend**, componente `@convex-dev/resend`) + verificação **Turnstile** na action. ⚠️ Testes só com destino nosso |
| Painel | Rotas `app/painel/*` no próprio Next, com shadcn/ui, 100% em português |

**O que o cliente vai ver (mesmo desenho validado no protótipo):** login → "Olá, Nome!" com botões grandes **Novo projeto** / **Meus projetos** → formulário com Título, Foto de capa, O que foi feito, Fotos (arrastar e soltar), Mostrar no site → Salvar. Foto de perfil opcional. Papéis **admin** (desenvolvedor) e **cliente** (só projetos).

**Contas necessárias (criadas pelo dono do projeto):** Convex (plano grátis), Cloudflare com R2 (10 GB grátis), Resend, Turnstile.

## 13. Roadmap

Ordem original (29/10/2026): segurança → shadcn/ui → correções → backend → redesign.

**Ordem revisada (29/10/2026): segurança → shadcn/ui → correções → UI/redesign → backend (Convex + R2) → lançamento.** A UI vem antes do backend: o visual fica definido com dados estáticos e o backend depois só troca a fonte dos dados.

### Fase 1 — Atualização e segurança (prioridade máxima)

Objetivo: zerar as vulnerabilidades e deixar a base pronta para o shadcn/ui (que exige React 19 + Tailwind 4 nas versões atuais).

- Atualizar **Next.js** para a última versão estável (13.4 → 15/16), **React 19** e **TypeScript** atual.
- Atualizar **Tailwind 3 → 4** (configuração passa para CSS com `@theme`; migrar cores `primary-*`, fontes fluidas e animação `pulse-grown`).
- Rodar `npm audit` até zerar as vulnerabilidades críticas e altas.
- Remover dependências mortas: `lucide-react` antigo (volta atualizado com o shadcn), `@types/*` fixados em versões antigas, componente `Swiper` comentado.
- Escolher **um** gerenciador de pacotes (npm ou bun) e remover o outro lockfile.
- Tirar `public/data/data.ts` de `public/` (ex.: `lib/data/projects.ts`).
- Remover o import morto de `next/router`.
- Configurar ESLint (config do Next) e Prettier.
- **Critério de pronto:** `build` e `lint` passando, `npm audit` sem críticas/altas, site visualmente igual ao atual.

> Atenção: confirmar no momento da atualização qual versão do Next o **Payload 3** suporta, para não precisar atualizar duas vezes.

### Fase 2 — Implementação do shadcn/ui

Objetivo: base de componentes acessíveis, consistentes e fáceis de manter, que também será usada no futuro (modal de projeto, formulário, etc.).

- `npx shadcn@latest init` (estilo, cores base, CSS variables, alias `@/components/ui`).
- Definir os **tokens de tema** (cores da marca, raio, fonte) em CSS variables, já com fundo explícito no `body` (resolve o bug 6).
- Componentes a adicionar e o que cada um substitui:

| Componente shadcn/ui | Substitui / resolve |
|---|---|
| `Button` | `components/Button` (bug 11) e os botões soltos com classes repetidas |
| `Carousel` (Embla) | **Swiper** — slider novo da home e galeria dos projetos (bugs 5 e 10) |
| `Sheet` | menu mobile atual + Context + os 7 hooks de `utils/` (seção 7) |
| `Dialog` | modal de sucesso do contato e o **modal de projeto** (seção 12.3) |
| `Card` | cards de áreas de aplicação, depoimentos e projetos |
| `Input`, `Textarea`, `Label`, `Form` (react-hook-form + Zod) | formulário de contato com validação e mensagens em português |
| `Sonner` (toast) | feedback de envio/erro do formulário (bug 7) |
| `NavigationMenu` (opcional) | menu desktop |

- Remover o **Swiper** do projeto quando o Carousel estiver no lugar.
- **Critério de pronto:** shadcn configurado, componentes base instalados e tema com as cores da Light Films.

### Fase 3 — Correções e reconstrução das seções

Reconstruir as seções usando os componentes da Fase 2, corrigindo os itens da seção 8 no caminho:

- **Header:** links que funcionam em qualquer página (`/#contato` em vez de scroll via JS) + `Sheet` no mobile (bug 1).
- **Title:** novo componente sem as barras `50vw`; remover `overflow-x-hidden` do `<html>` (bug 2).
- **Projetos (home):** novo `Carousel` lendo os dados, sem slides duplicados (bug 5).
- **Página do projeto:** `notFound()`, `generateStaticParams`, `generateMetadata`, descrição visível e galeria (bugs 3, 4, 12).
- **Modal de projeto** com `Dialog` + botão "Quero um orçamento parecido" no WhatsApp (seção 12.3).
- **Contato** (⚠️ sem testar envio real — ver regra no topo): `Form` + Zod + `Sonner`, loading, bloqueio de envio duplo e erro visível (bug 7). Envio via Server Action com anti-spam (Cloudflare Turnstile) em vez das chaves do EmailJS no client.
- **CSS global:** remover `user-select: none` e `outline: none`; foco visível padrão do shadcn (bugs 8 e 9).
- **Hero:** `100svh`, imagem com `next/image` + `priority` (bug 13).
- **Conteúdo:** corrigir textos, concordância e descrições duplicadas (seção 11).
- Converter imagens pesadas para AVIF/WebP.

### Fase 4 — UI e redesign (próxima)

Objetivo: o site com cara de empresa de verdade — identidade própria, mais confiança e mais pedidos de orçamento. Tudo com dados estáticos (projetos e depoimentos em arquivos `.ts`, textos do cliente em lorem ipsum).

1. **Direção visual** — referências (sites de películas/arquitetura que o time gosta), definir paleta, tipografia e estilo de foto. Decidir se haverá logo novo.
2. **Design system** — tokens no `globals.css` (cores, tipografia, raios, sombras, espaçamentos), variantes de Button/Card, componentes de seção reutilizáveis. Base shadcn/ui continua.
3. **Redesign das seções existentes** — Header (fixo ao rolar), Hero (foto real + CTA de orçamento), Áreas de aplicação, Benefícios (em cards/ícones em vez de texto corrido), Projetos, Depoimentos, Contato, Footer (endereço, CNPJ, redes, horário).
4. **Seções novas** — tipos de película, antes/depois (slider comparativo), como funciona (passo a passo do serviço), FAQ (Accordion), garantia, área de atendimento.
5. **Páginas** — `/projetos` e página do projeto redesenhadas; página 404.
6. **Qualidade** — responsivo (mobile primeiro), acessibilidade (contraste, foco, teclado), performance (Lighthouse ≥ 90), animações sutis respeitando `prefers-reduced-motion`.
7. **SEO** — metadados por página, Open Graph, `sitemap.xml`, `robots.txt`, dados estruturados `LocalBusiness`.
- **Critério de pronto:** todas as páginas no novo visual, aprovadas por nós, com build/lint/typecheck verdes.

### Fase 5 — Backend: Convex + Cloudflare R2 + painel próprio

Arquitetura na seção 12.6.

1. Remover o protótipo em Payload (rotas `/admin`, coleções, SQLite, `media/`) — fica registrado no histórico do git.
2. Configurar **Convex** (schema: projetos, usuários, leads, depoimentos) e **Convex Auth** (e-mail + senha, papéis admin/cliente).
3. Configurar **R2** (bucket, CORS, domínio público) + `@convex-dev/r2`; compressão das fotos no navegador.
4. **Painel próprio** em `/painel` com shadcn/ui, 100% em português: login, tela inicial, lista e formulário de projetos, foto de perfil.
5. Site lendo do Convex + revalidação ao publicar.
6. Migrar Senai, Sabesp, Porto Seguro (fotos de `public/projects` → R2) e remover `public/projects`.
7. Formulário de contato: lead no Convex + e-mail (Resend) + Turnstile; remover EmailJS. ⚠️ Testes só com destino nosso.
8. Manual do cliente ("como publicar um projeto em 3 passos", com prints).
9. **Validar o painel com o cliente.**

### Fase 6 — Conteúdo real e lançamento

- Textos reais dos projetos, depoimentos reais (ou avaliações do Google), fotos atuais, logo.
- Domínio próprio + variáveis de produção na Vercel.
- CI (build + lint + typecheck em PR).
- Revisão final e merge de `renovacao-v2` na `main` (só com ok explícito).

## 14. Checklist geral

**Fase 1 — Atualização e segurança** ✅ (29/10/2026, branch `renovacao-v2`)
- [x] Next.js 16.4.3 (compatível com Payload 3, que exige `>=16.3.3`)
- [x] React 19.3 + TypeScript 6.0 (o TS 7 nativo ficou de fora por enquanto, por compatibilidade com o tooling do Next)
- [x] Tailwind 4.3 com tema migrado para `@theme` em `app/globals.css` (`tailwind.config.js` removido)
- [x] `bun audit`: **0 vulnerabilidades** (antes: 15, sendo 2 críticas)
- [x] Dependências mortas removidas (`lucide-react`, `autoprefixer`, componente Swiper comentado, `useMediaQuery`, `useIsFirstRender`, `useUpdateEffect`)
- [x] **Bun** como gerenciador de pacotes; `package-lock.json` removido, `bun.lock` versionado
- [x] Dados movidos para `lib/data/projects.ts` (`/data/data.ts` agora retorna 404)
- [x] ESLint 9 (flat config `eslint-config-next`) + Prettier configurado (`.prettierrc.json`, com plugin do Tailwind). A formatação em massa do código ainda **não** foi aplicada, para não poluir o diff
- [x] Site visualmente igual ao anterior (conferido no desktop e no mobile)

**Fase 2 — shadcn/ui** ✅ (29/10/2026, branch `renovacao-v2`)
- [x] `shadcn init` (base **Radix**, preset **Vega**, CSS variables) com tema da Light Films: `--primary` `#1b3748`, `--ring` `#243c5a`, fonte **Montserrat** como `--font-sans` (o preset tinha trocado para Inter; revertido)
- [x] Fundo explícito no `body` (`bg-background`, branco) — resolve o bug 6 da seção 8
- [x] Instalados em `components/ui/`: Button, Card, Carousel, Dialog, Field (substitui o antigo `Form` do shadcn), Input, Label, Separator, Sheet, Sonner, Textarea
- [x] Swiper removido; slider da home agora é o **Carousel (Embla)** com autoplay, lendo `ProjectsData` (sem slides duplicados, sem o vão no mobile; cada foto leva à página do projeto) — adianta o bug 5
- [x] Setas antigas (`arrow-*.svg`) removidas; setas do Carousel são `<button>` acessíveis — adianta o bug 10 na home

Notas da Fase 2:
- O registry do shadcn gerou `import { cn } from "cn"` (pacote errado). Corrigido para o helper padrão `lib/utils.ts` (`clsx` + `tailwind-merge`).
- `Sonner` fixado em tema claro e `next-themes` removido (o site não tem modo escuro).
- `shadcn` ficou em `devDependencies`: ele só fornece o CSS `shadcn/tailwind.css` no build. `bun audit` mostra **1 vulnerabilidade baixa** (`deepmerge`, sem correção publicada) que vem só do CLI do shadcn e não vai para o site.
- Regra `react-hooks/set-state-in-effect` desligada só em `components/ui/**` (código gerado pelo shadcn).
- No desktop, com 3 projetos, todos cabem na tela e as setas ficam desativadas. Quando houver mais projetos (via painel), o carrossel volta a rolar.
- Os componentes Sheet, Dialog, Card, Field e Sonner estão instalados mas ainda **não** foram aplicados nas seções. Isso é a Fase 3.

**Fase 3 — Correções e reconstrução** ✅ (29/10/2026, branch `renovacao-v2`)
- [x] Menu funcionando em todas as páginas: links reais `/#secao` + **Sheet** no mobile (bug 1). IDs das seções agora em português: `#inicio`, `#atuacao`, `#beneficios`, `#projetos`, `#clientes`, `#contato`
- [x] Títulos sem overflow (novo `Title` com linhas flexíveis); `overflow-x-hidden` removido do `<html>` (bug 2). Largura da página no mobile = largura da tela
- [x] Slider da home com Carousel, a partir dos dados, sem duplicação (feito na Fase 2)
- [x] `notFound()` + páginas de projeto estáticas (`generateStaticParams`, `dynamicParams = false`) + `generateMetadata` com título, descrição, canonical e imagem OG por projeto (bugs 3, 4, 12). Página 404 em português
- [x] **Modal de projeto** (Dialog): título, descrição, galeria (Carousel), botões "Ver página do projeto" e "Quero um orçamento parecido" (WhatsApp com mensagem citando o projeto). Abre pelo carrossel da home e pelo grid de `/projetos`
- [x] Formulário com **Field + Input + Textarea**, validação **Zod** com mensagens em português, loading ("Enviando..."), bloqueio de envio duplo, erro via **Sonner** (toast) e sucesso via **Dialog** (bug 7). Testado só a validação, com a rede do EmailJS bloqueada — **nenhum envio feito**
- [ ] Envio via Server Action + anti-spam (Turnstile) — **movido para a Fase 4** (depende de conta Resend/Turnstile e do banco de leads)
- [x] Sem `user-select: none` / `outline: none`; foco visível padrão do shadcn (bugs 8 e 9)
- [x] Hero com `min-h-svh` e imagem via `next/image` com `priority` (bug 13)
- [x] Textos corrigidos: "Película Arquitetônica", "Benefícios das Películas", "Insulfilm" nas keywords, "Marcos Santos" sem vírgula, sem texto justificado
- [x] Descrições dos projetos (as de Sabesp/Porto Seguro eram cópia de "loja de roupas") trocadas por **lorem ipsum** até o cliente enviar os textos reais
- [x] Depoimentos trocados por **lorem ipsum** ("Nome do Cliente N", "Cargo / Empresa") até o cliente enviar depoimentos reais
- [x] Largura máxima do conteúdo (`max-w-7xl`, 1280px) em header, seções e footer — o layout não estica mais em telas ultrawide
- [x] Botão do menu mobile sem o fundo claro quando o menu está aberto
- [x] Imagens servidas em AVIF/WebP (`images.formats` no `next.config.js`)
- [x] Hooks de `utils/` removidos (pasta apagada), além de `components/Button`, `Header/{Logo,Menu,MenuItem}`, `Contact/Modal`, `projetos/(components)`, `menu.png`, `quote.png`

Componentes shadcn em uso após a Fase 3: Button (Hero, Projetos, Formulário, 404, modais), Card (Áreas de aplicação, Depoimentos, `/projetos`), Carousel (home e galeria do modal), Sheet (menu mobile), Dialog (modal de projeto e sucesso do formulário), Field/Input/Textarea/Label (formulário), Sonner (erros do formulário).

Notas da Fase 3:
- `lib/site.ts` centraliza nome, telefone, WhatsApp, Facebook e links do menu. O botão do WhatsApp agora aparece em todas as páginas.
- Botão do shadcn ganhou variantes da marca: `brand` (branco) e `brand-solid` (azul), com tamanho `brand`.
- `tailwind-merge` foi configurado para reconhecer o tamanho de fonte customizado `text-medium` (sem isso ele era descartado ao lado de `text-primary-400`).
- Labels de acessibilidade do shadcn traduzidos ("Fechar", "Slide anterior", "Próximo slide").
- Conhecido: no mobile, ao vir de `/projetos` para `/#contato`, a rolagem pode parar um pouco depois do início da seção (imagens carregando durante a rolagem). Desktop para exatamente na seção.

**Fase 4 — UI e redesign** 🟡 em andamento (29/10/2026, branch `renovacao-v2`)
- [x] Direção visual (proposta abaixo; logo novo ainda em aberto)
- [x] Design system: paleta, tipografia e variantes de botão em `app/globals.css` / `components/ui/button.tsx`
- [x] Redesign da home: header fixo com CTA, hero com simulador de tom, Onde aplicamos, Benefícios, Projetos, Depoimentos, Contato, Footer
- [x] Seção nova: **Como funciona** (4 etapas — confirmar com o cliente)
- [x] Ajustes de navegação: sublinhado azul que cresce da esquerda para a direita no hover; item do menu **ativo conforme a seção na tela** (scroll-spy) e "Projetos" ativo nas páginas de projeto; menu mobile com título discreto e item ativo em azul-claro
- [x] Títulos dos projetos com o mesmo sublinhado animado; `/projetos` com o mesmo card da home (foto + título expandido); modal e botões do projeto no novo estilo
- [x] Footer sempre no fim da tela em páginas curtas
- [x] Benefícios sem foto: título fixo à esquerda (acompanha a rolagem no desktop) e lista à direita com ícone em círculo azul-claro, título grande e texto
- [x] Depoimentos: 3 colunas, sem a linha de cima, com aspas azuis acima de cada citação (a versão com uma citação por vez foi testada e descartada)
- [x] Identidade: paleta voltou aos azuis do site antigo (`vidro #1b3748`, `vidro-2 #243c5a`) com destaque azul-vidro `ceu #2a74a6` e `ceu-claro #8cc8ec` em fundo escuro; o âmbar e o símbolo provisório foram descartados (não fazem parte da marca). Hero com painel de vidro azul atrás da janela, faixa azul-clara em "calor", feixes diagonais azuis e linha de apoio
- [x] Footer em `vidro-escuro` (#0f2230), separado da seção de contato sem linha
- [x] Header em azul-petróleo (`bg-vidro/95`) com texto branco, sublinhado azul-claro e item ativo em branco
- [ ] Logo oficial: perguntar ao cliente se existe arquivo do logo; por ora só o nome "Light Films"
- [x] Modal: título, texto e ações empilhados; botão e "Abrir página do projeto" lado a lado, alinhados à esquerda com o texto
- [x] Ordem do menu igual à ordem da página: Benefícios → Projetos → Como funciona → Contato
- [x] Modal de projeto refeito: fotos primeiro (largura total), contador "2 de 12", setas brancas sólidas; texto e botão lado a lado embaixo; botão menor e "Abrir página do projeto" como link
- [x] Setas do carrossel: ativas em azul sólido, desativadas só com contorno claro (antes as duas pareciam apagadas)
- [ ] Seções novas restantes: tipos de película, antes/depois, FAQ, garantia, área de atendimento
- [ ] `/projetos`, página do projeto e 404 redesenhadas
- [ ] Responsivo, acessibilidade e Lighthouse ≥ 90
- [ ] SEO técnico (metadados, OG, sitemap, `LocalBusiness`)

Direção visual da Fase 4 (proposta):
- **Conceito:** o mundo do vidro e da luz. Um único elemento ousado — o **simulador de tom** no hero (janela com caixilhos sobre foto real; o visitante escolhe Sem película / Clara / Fumê / Escura / Espelhada). O resto da página é calmo e alinhado à esquerda.
- **Cores:** Vidro `#1B3748` (texto e seções escuras, azul do site antigo), Vidro-2 `#243C5A`, Vidro-escuro `#0F2230` (footer), Névoa `#F1F5F8` (fundo), Reflexo `#9DB8CC` (linhas), Céu `#2A74A6` (botões de orçamento e estados ativos) e Céu-claro `#8CC8EC` (destaques em fundo escuro), Branco. Classes: `bg-vidro`, `bg-nevoa`, `text-reflexo`, `bg-ceu`, `text-ceu-claro`.
- **Tipografia:** **Archivo** (variável): títulos em largura expandida (`font-stretch-expanded`) e peso alto; corpo em largura normal. Uma família, duas vozes.
- **Regras:** títulos à esquerda, sem rótulos em caixa alta acima dos títulos, sem cards repetidos com sombra; numeração só onde há sequência real (Como funciona); animação só quando o visitante interage (simulador, hover das fotos). O autoplay do carrossel e a pulsação do botão do WhatsApp foram removidos.
- **Botões:** `brand` (Sol, pílula) para orçamento; `brand-solid` (Vidro) para ações secundárias; raio pequeno (2–6px) em fotos e caixilhos, pílula em botões.
- Copy nova da home (títulos e descrições das áreas, benefícios e etapas) escrita por nós — **revisar com o cliente** antes do lançamento.

**Fase 5 — Backend (Convex + R2 + painel próprio)**
- [ ] Contas criadas: Convex, Cloudflare R2, Resend, Turnstile
- [ ] Protótipo Payload removido
- [ ] Convex schema + Convex Auth (admin/cliente)
- [ ] R2 + upload com compressão
- [ ] Painel `/painel` em português (login, início, projetos, foto de perfil)
- [ ] Site lendo do Convex + revalidação
- [ ] Migração dos projetos e fotos para Convex/R2; `public/projects` removido
- [ ] Leads + Resend + Turnstile; EmailJS removido
- [ ] Manual do cliente
- [ ] Painel validado com o cliente

**Fase 6 — Conteúdo real e lançamento**
- [ ] Conteúdo real do cliente
- [ ] Domínio próprio
- [ ] CI
- [ ] Merge na `main` (com ok explícito)

<details>
<summary>Protótipo em Payload (29/10/2026) — descontinuado, mantido como referência</summary>

Código guardado na branch **`prototipo-payload`** (commit `66c59ab`). A `renovacao-v2` voltou ao estado da Fase 3; as instruções abaixo valem só naquela branch.

O que foi validado e será reaproveitado no painel próprio: campos do projeto, tela inicial com dois botões, papéis admin/cliente, foto de perfil, compressão de fotos e revalidação ao publicar.

Checklist do protótipo:
- [x] **Payload 3.92** dentro do próprio Next (rotas `/admin` e `/api`), com o site movido para o route group `app/(frontend)` e o painel em `app/(payload)`
- [x] Painel **100% em português** (`i18n` só com `pt`), marca **Light Films** no login e no menu (sem logo do Payload)
- [x] Painel sempre no **modo claro** (`admin.theme: "light"`), mesmo com o sistema em modo escuro; o seletor de tema some
- [x] Ícone "LF" em SVG (escala para o espaço do breadcrumb, sem cortar) e ícones de painel lateral (abrir/recolher) no lugar da seta e do hambúrguer padrão
- [x] Traduções ajustadas: "Cardápio" → "Menu", "Configurações do Payload" → "Preferências"
- [x] **Foto de perfil** no usuário (campo "Foto de perfil"), exibida no canto superior direito; sem foto, mostra as iniciais
- [x] Coleção **Projetos** com só o essencial: Título, Foto de capa, O que foi feito (texto simples, sem editor rico), Fotos do projeto (várias), Mostrar no site; endereço da página (slug) gerado automaticamente; data de criação automática
- [x] **Tela inicial customizada** para o cliente: "Olá, Nome!", botões grandes **Novo projeto** e **Meus projetos**, e um passo a passo de 3 itens
- [x] Permissões: usuário **cliente** vê só "Projetos" no menu; Imagens e Usuários ficam escondidos (só **admin**). Testado: o cliente vê apenas a própria conta e **não consegue** se promover a admin
- [x] Fotos comprimidas automaticamente no upload (WebP, máx. 2400px) — foto de celular não pesa vários MB
- [x] Site lê os projetos do Payload (`lib/projects.ts`, Local API, só publicados). Ao salvar/excluir no painel o site atualiza na hora (`revalidatePath`). Testado: desmarcar "Mostrar no site" tira o projeto da home, de `/projetos` e a página vira 404; marcar de novo traz de volta
- [x] Migração: `bun run seed` importa Senai, Sabesp e Porto Seguro (72 imagens) e cria os usuários de teste
- [x] Segurança: GraphQL desligado (rotas removidas, `/api/graphql` = 404); `dompurify` forçado para 3.4.17 via `overrides`
- [ ] **Validar o protótipo com o cliente** (usuário cliente de teste no `.env.local`)
- [ ] Banco de produção: trocar SQLite por **Postgres** (Neon ou Supabase) + migrations (`payload migrate`)
- [ ] Storage de imagens em produção: **Vercel Blob** ou S3 (a pasta local `media/` não funciona na Vercel)
- [ ] **Adaptador de e-mail** (Resend) — sem ele o "Esqueceu a senha?" não envia nada (hoje só escreve no console do servidor). ⚠️ Testar só com destino nosso
- [ ] Leads do formulário salvos no banco + e-mail via Server Action com anti-spam (Turnstile); remover chaves do EmailJS do client
- [ ] Manual do cliente ("como publicar um projeto em 3 passos", com prints)
- [ ] Remover `public/projects/` depois que a produção estiver com as fotos no storage
- [ ] Vulnerabilidades restantes (`bun audit`): `graphql-scalars` (alta, só usado pelo GraphQL, que está desligado), `esbuild` (moderada, ferramenta de dev do drizzle-kit), `deepmerge` (baixa, CLI do shadcn) — nenhuma chega ao site em produção; reavaliar quando o Payload atualizar

Como rodar o protótipo localmente:
1. `cp .env.example .env.local` e preencher `PAYLOAD_SECRET` e as senhas de teste (o `.env.local` atual já está preenchido e **não** vai para o git)
2. `bun install`
3. `bun run seed` (cria o banco SQLite em `data/`, os usuários e importa os projetos)
4. `bun dev` → site em `http://localhost:3000`, painel em `http://localhost:3000/admin`

Notas técnicas da Fase 4:
- `package.json` agora tem `"type": "module"` (padrão do Payload). Sem isso a CLI do Payload quebra no Node 22/26 (erro do `undici`).
- Se `bun run generate:importmap` disser "No new imports found" depois de adicionar um componente no painel, zerar `app/(payload)/admin/importMap.js` e rodar de novo.
- `bun run generate:types` atualiza `payload-types.ts` sempre que uma coleção mudar.
- URLs desconhecidas caem em `app/(frontend)/[...rest]` → 404 em português.



</details>

## 15. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 29/10/2026 | ~~Backend com **Payload CMS 3 enxuto**~~ (substituído por Convex + R2, ver abaixo) | Login, upload e segurança prontos; dá para simplificar o painel ao nível que o cliente precisa |
| 29/10/2026 | Painel **100% em português**, só a coleção "Projetos", texto simples (sem editor rico) | Cliente não é técnico |
| 29/10/2026 | Projetos exibidos no site em **modal simples** (título, texto, fotos, CTA WhatsApp) | Mais direto para o visitante; reaproveita o `Dialog` do shadcn/ui |
| 29/10/2026 | Adotar **shadcn/ui** como base de componentes | Componentes acessíveis e consistentes; substitui Swiper, menu manual e hooks |
| 29/10/2026 | Trocar **Swiper → Carousel do shadcn/ui (Embla)** | Slider atual hardcoded e com problemas; Embla é mais leve |
| 29/10/2026 | Ordem: **segurança → shadcn/ui → correções → backend → redesign** | Vulnerabilidades primeiro; correções aproveitam os novos componentes |
| 29/10/2026 | **Todo o trabalho na branch `renovacao-v2`**; nada vai para `main` até a renovação inteira (Fases 1–6) estar concluída | `main` é o que está no ar; só recebe a versão final |
| 29/10/2026 | **Proibido testar envio** do formulário/e-mail/WhatsApp com os dados reais | O destino é o e-mail real do cliente; um teste pareceria um lead verdadeiro |
| 29/10/2026 | Textos que dependem do cliente (descrições de projetos, depoimentos) ficam em **lorem ipsum** até ele enviar os reais | Evita publicar texto inventado em nome do cliente |
| 29/10/2026 | Protótipo do painel com **SQLite + pasta local**; produção vai para **Postgres + Vercel Blob/S3** | Permite validar com o cliente sem criar contas; a troca é só de adapter |
| 29/10/2026 | Dois papéis no painel: **admin** (desenvolvedor) e **cliente** (só Projetos) | Menos opções para o cliente, menos chance de erro |
| 29/10/2026 | **Backend trocado para Convex + Cloudflare R2**, com painel próprio em `/painel` (substitui o Payload) | Preferência do time; Payload não suporta Convex, então o painel passa a ser feito com shadcn/ui, mantendo o desenho validado no protótipo |
| 29/10/2026 | **Nova ordem:** UI/redesign (Fase 4) **antes** do backend (Fase 5) | Definir o visual com dados estáticos primeiro; o backend depois só troca a fonte dos dados |
| 29/10/2026 | **Bun** no lugar do npm (`bun install`, `bun dev`, `bun run build`) | Preferência do time |
| 29/10/2026 | TypeScript 6 (não 7) e ESLint 9 (não 10) | Versões mais novas ainda sem garantia de compatibilidade com o tooling do Next 16 |
