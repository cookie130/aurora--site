# Verificação da entrega — 13/11/2026

## Executado

- Instalação npm e build de produção Next.js: aprovados; quatro páginas principais e rotas técnicas exportadas.
- ESLint: aprovado, sem erros ou avisos no código.
- TypeScript: aprovado.
- Nove testes automatizados: aprovados. Cobrem filtros de todas as categorias, atualização da contagem acessível, menu expansível, Escape e retorno de foco, fechamento ao navegar, URLs de contato permitidas/bloqueadas, HTML semântico exportado, metadados, links internos e existência/formato das imagens locais.
- Auditoria npm das dependências de produção: zero vulnerabilidades reportadas.
- Auditoria completa: sete alertas moderados transitivos na cadeia TypeScript-ESLint/minimatch, restritos às ferramentas de desenvolvimento. A tentativa de atualização automática não os resolveu de forma compatível; mantido ESLint 9 compatível com os plugins do Next. Não se usaram atualizações forçadas nem overrides para apenas silenciar o relatório. Essa cadeia não é enviada no site estático. Rever ao atualizar as ferramentas.
- Contraste calculado das combinações principais: marrom/creme 12,26:1; texto secundário/creme 5,02:1; oliva/creme 4,64:1; branco quente/oliva 5,14:1. Esses resultados não equivalem a uma auditoria WCAG completa.
- Fotografias abertas e inspecionadas visualmente em uma prancha: correspondência dos assuntos, coerência de tons e ausência de arquivos quebrados. Arquivos convertidos em WebP responsivo.
- Fontes e imagens são locais; não dependem de requisições a Google Fonts ou Unsplash durante a visita.

## Limite real da verificação

O ambiente gerenciado não disponibilizou a ferramenta de controle do navegador (`cua_repl.js`). A capacidade de desktop foi indicada como habilitada, mas sem ferramenta utilizável. Por isso não houve inspeção visual das páginas renderizadas, screenshots de desktop/mobile, Lighthouse, teste com leitor de tela ou teste de ponta a ponta em navegador. Os testes JSDOM verificam comportamento e estrutura, não layout, encaixe tipográfico ou ausência de sobreposição.

A revisão do CSS incluiu breakpoints, foco, tamanho de leitura, proporções e movimento reduzido. A revisão visual final em navegador continua pendente. Não se declara conformidade integral WCAG, perfeição visual, segurança absoluta ou “zero aparência de IA”.

## Revisão manual recomendada

Abrir todas as páginas em 360, 390, 768, 1024 e 1440 px; conferir enquadramentos, leitura, quebras de títulos e ausência de rolagem lateral. Navegar por teclado, abrir e fechar o menu, testar os quatro filtros, ampliar o texto a 200%, ativar movimento reduzido e testar os canais depois de configurados. Confirmar os destinos reais e substituir todos os dados fictícios antes do uso comercial.

## Ajuste de interação

Adicionada uma aproximação discreta em hover para botões, filtros, menu e links de chamada. Efeito restrito a `hover: hover`, `pointer: fine` e `prefers-reduced-motion: no-preference`; o movimento de clique também foi removido em movimento reduzido. Build de produção reexecutado. A intensidade visual ainda precisa ser avaliada pelo usuário no navegador, indisponível neste ambiente.

## Configuração de portfólio e indexação

Aviso discreto no rodapé de todas as páginas: “Projeto demonstrativo de portfólio. A Padaria Aurora é uma empresa fictícia.” Texto de 11 px, preservando a composição e as cores. Verificação automatizada do HTML exportado das quatro páginas confirma a presença de `noindex`, ausência de diretiva `index` conflitante e o aviso de empresa fictícia. `robots.txt` permite a leitura do HTML para os buscadores encontrarem o `noindex`; isso não autoriza indexação nem modifica as permissões da hospedagem. Build, tipos e dez testes aprovados nesta revisão. A verificação cobre os arquivos exportados usados no deploy; não é uma consulta ao índice do Google nem uma inspeção visual em navegador.
