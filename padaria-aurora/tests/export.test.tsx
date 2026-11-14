import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { products } from '../lib/products';
const routes=['','nossa-historia','produtos','contato'];
for(const route of routes) test(`Exportação /${route}: semântica, metadados, links internos e imagens locais`,()=>{
 const html=readFileSync(path.join('out',route,'index.html'),'utf8');
 const doc=new JSDOM(html).window.document;
 assert.equal(doc.documentElement.lang,'pt-BR');
 assert.equal(doc.querySelectorAll('h1').length,1);
 assert.ok(doc.querySelector('main#conteudo'));
 assert.ok(doc.querySelector('meta[name="description"]')?.getAttribute('content'));
 assert.ok(doc.querySelector('link[rel="canonical"]'));
 assert.ok(doc.querySelector('meta[property="og:image"]'));
 const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.split(',').map(value => value.trim()) || [];
 assert.ok(robots.includes('noindex'), 'A página deve instruir os buscadores a não indexá-la');
 assert.ok(!robots.includes('index'), 'Não deve existir uma diretiva index conflitante');
 assert.match(doc.querySelector('footer .demo-notice')?.textContent || '', /Projeto demonstrativo de portfólio.*empresa fictícia/);
 for(const img of doc.querySelectorAll('img')){
  assert.ok(img.alt.length>0);assert.ok(existsSync(path.join('out',img.getAttribute('src')!)));
  for(const source of (img.getAttribute('srcset')||'').split(',')){const file=source.trim().split(' ')[0];if(file)assert.ok(existsSync(path.join('out',file)),file);}
 }
 for(const a of doc.querySelectorAll('a[href^="/"]')){
  const href=a.getAttribute('href')!.split('#')[0];assert.ok(existsSync(path.join('out',href,'index.html')),href);
 }
 assert.ok(!doc.querySelector('form'));
});
test('robots.txt permite a leitura das páginas para que os buscadores encontrem noindex',()=>{
 const robots = readFileSync('out/robots.txt','utf8');
 assert.match(robots, /^User-Agent: \*$/mi);
 assert.match(robots, /^Allow: \/$/mi);
 assert.doesNotMatch(robots, /^Disallow: \/$/mi);
});
test('Cada produto tem três imagens WebP válidas e arquivos de publicação existem',()=>{
 for(const p of products)for(const w of [480,800,1200]){const b=readFileSync(`public/images/${p.image}-${w}.webp`);assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');}
 for(const f of ['out/robots.txt','out/sitemap.xml','out/og.jpg','out/icon.svg'])assert.ok(existsSync(f));
});
