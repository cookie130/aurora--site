# Padaria Aurora

Site institucional de uma padaria **fictícia**, criado para portfólio. Quatro páginas, identidade editorial em creme, marrom e oliva, catálogo filtrável, fotografias locais e contatos configuráveis. Sem carrinho, banco de dados, formulário ou envio simulado.

## Executar

Requer Node.js 22.13+ ou 24 LTS (recomendado) e npm.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. A porta pode mudar se já estiver em uso; confira o terminal.

```bash
npm run build
npm run lint
npm run typecheck
npm test
```

Execute o build antes dos testes: parte deles verifica os arquivos exportados em `out/`. O projeto usa exportação estática. `next start` não serve este formato; para conferir a exportação, use `python3 -m http.server 3000 --directory out` e abra http://localhost:3000.

## Tecnologias e estrutura

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 com tokens e estilos autorais. Versões exatas ficam no `package-lock.json`. Testes com Node Test Runner, tsx, React Testing Library e JSDOM. Não há dependências de animação ou biblioteca de ícones.

- `app/page.tsx`: início, vitrine, processo e cafeteria.
- `app/nossa-historia/page.tsx`: narrativa e filosofia de produção.
- `app/produtos/page.tsx`: catálogo demonstrativo.
- `app/contato/page.tsx`: horários, endereço ilustrativo e canais.
- `app/layout.tsx`: estrutura, idioma, SEO e Open Graph.
- `app/globals.css`: paleta, tipografia, espaçamentos, componentes, estados, breakpoints e movimento reduzido.
- `components/`: logotipo SVG, navegação mobile, rodapé, fotografias responsivas, catálogo e elementos reutilizáveis.
- `lib/site.ts`: empresa, domínio, endereço, horários e validação dos contatos.
- `lib/products.ts`: categorias, produtos, preços, imagens e formatação de moeda.
- `public/images/`: fotografias WebP em 480, 800 e 1200 px. `public/fonts/`: fontes locais e licenças.
- `tests/`: comportamento dos filtros e menu, URLs seguras, semântica da exportação e integridade dos arquivos.
- `CREDITS.md`: fontes das fotografias e licenças.
- `QA.md`: verificações realizadas e limites da avaliação.

## Editar os dados

Edite `lib/site.ts` para informações da empresa. Os contatos iniciam vazios; assim o site mostra uma mensagem honesta de indisponibilidade. Para ativar, forneça:

- `contacts.whatsapp`: URL HTTPS `wa.me` com número internacional válido, sem espaços. Exemplo estrutural: `https://wa.me/NUMERO_COM_DDI` (substitua por um número real autorizado).
- `contacts.instagram`: URL HTTPS do perfil oficial em `instagram.com` ou `www.instagram.com`.

A validação rejeita protocolos diferentes de HTTPS, credenciais na URL, portas não padrão e domínios parecidos. Isso valida a estrutura; a existência e titularidade da conta devem ser confirmadas pelo responsável. Não foram criadas contas nem usados números reais neste projeto.

Produtos ficam em `lib/products.ts`. `price` é um número em reais; `image` aponta para o prefixo de três WebPs. Mantenha textos alternativos correspondentes. Fotografias são referências visuais, não registros de produtos da Aurora.

## Design

Cormorant Garamond para títulos e DM Sans para leitura. Base creme `#F6F0E6`, texto `#39291F`, caramelo `#B97943` para detalhes, oliva `#657052` e branco quente `#FFFCF7`. Composições distintas por página; sem gradientes, sombras decorativas ou cartões arredondados recorrentes. A marca combina logotipo tipográfico e um sol nascente em SVG.

Os layouts se adaptam em 640, 820 e 1100 px. O menu móvel é uma navegação expansível, com estado `aria-expanded`, fechamento por Escape e retorno de foco. Os filtros são botões com `aria-pressed` e contagem anunciada. Imagens usam `srcset`, dimensões e carregamento tardio fora do hero. Há link de salto, foco visível e suporte a `prefers-reduced-motion`. Ao passar o mouse, botões têm uma aproximação discreta (2,5% de escala e 2 px de elevação); links do menu e chamadas de texto usam um movimento ainda menor. A transição dura 220 ms, não altera o fluxo do layout e só se aplica a dispositivos com mouse e movimento permitido.

## Publicar na Vercel

1. Envie o código para um repositório Git.
2. Importe o repositório na Vercel e selecione Next.js. Instalação: `npm ci`; build: `npm run build`.
3. Mantenha `output: "export"` em `next.config.ts`; a saída estática é `out/`. Se usar o preset Other, configure explicitamente esse diretório.
4. Configure o domínio definitivo em `lib/site.ts` e refaça o build.
5. Para um cliente real, depois de substituir os dados fictícios, altere `robots.index` para `true` no layout global para permitir indexação. Este portfólio usa `robots: { index: false, follow: true }` na Metadata API do Next.js, que gera `<meta name="robots" content="noindex, follow">` em todas as páginas. O `robots.txt` permite rastreamento para que os buscadores possam ler e respeitar essa diretiva. Isso não muda o acesso dos visitantes; a privacidade é configurada separadamente na hospedagem. Alterações no código só entram no ar após novo build e deploy.

A mesma pasta `out/` pode ser hospedada em qualquer serviço estático que respeite diretórios com `index.html`. Sites utiliza `.openai/hosting.json` no checkout de publicação; esse identificador não acompanha o ZIP reutilizável. Uma cópia para um novo Site deve receber um identificador novo.

## Antes de usar para um cliente real

Substitua marca/narrativa, endereço, horários, produtos, porções, preços, contatos e domínio. Confirme direitos das fotografias e substitua por fotos da operação real quando possível. Remova avisos de demonstração somente após substituir os dados. Não há loja física, atendimento, pedidos ou depoimentos reais neste projeto. Revise acessibilidade e composição no navegador e em dispositivos reais antes da entrega comercial.
