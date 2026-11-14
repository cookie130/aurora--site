import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { JSDOM } from 'jsdom';
import { safeSocialUrl, site } from '../lib/site';
import { products, categories, filterProducts, money } from '../lib/products';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'https://example.test/'});
Object.defineProperties(globalThis, { window: {value:dom.window, configurable:true}, self: {value:dom.window, configurable:true}, document: {value:dom.window.document, configurable:true}, navigator: {value:dom.window.navigator, configurable:true}, HTMLElement: {value:dom.window.HTMLElement, configurable:true}, IS_REACT_ACT_ENVIRONMENT: {value:true, writable:true, configurable:true} });
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Catalog } from '../components/catalog';
import { Header } from '../components/header';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js';

test('Contato aceita somente destinos HTTPS oficiais e rejeita esquemas e hosts enganosos', () => {
 assert.equal(safeSocialUrl('https://wa.me/5511999999999','whatsapp'),'https://wa.me/5511999999999');
 assert.equal(safeSocialUrl('https://www.instagram.com/padaria_aurora/','instagram'),'https://www.instagram.com/padaria_aurora/');
 for (const url of ['', 'javascript:alert(1)','http://wa.me/5511999999999','https://wa.me.evil.test/5511999999999','https://user:pass@wa.me/5511999999999','https://wa.me/abc','https://wa.me:8443/5511999999999']) assert.equal(safeSocialUrl(url,'whatsapp'),null,url);
 assert.equal(safeSocialUrl('https://evil.test/aurora','instagram'),null);
 assert.equal(safeSocialUrl(site.contacts.whatsapp,'whatsapp'),null);
});

test('Catálogo cobre todas as categorias e usa preços numéricos positivos', () => {
 assert.equal(new Set(products.map(p=>p.id)).size,products.length);
 for(const c of categories.slice(1)){const filtered=filterProducts(c);assert.ok(filtered.length>0);assert.ok(filtered.every(p=>p.category===c));}
 assert.ok(products.every(p=>p.price>0&&p.alt.length>10));
 assert.match(money(26),/26,00/);
});

test('Filtros atualizam vitrine, estado acessível e quantidade; Todos restaura o catálogo', () => {
 const ui=render(<Catalog/>);
 assert.equal(ui.getAllByRole('article').length,6);
 for(const c of categories.slice(1)){
  fireEvent.click(ui.getByRole('button',{name:c}));
  assert.equal(ui.getByRole('button',{name:c}).getAttribute('aria-pressed'),'true');
  const count=filterProducts(c).length;
  assert.equal(ui.getAllByRole('article').length,count);
  assert.match(ui.getByRole('status').textContent || '',new RegExp(`${count} produto`));
  assert.deepEqual(ui.getAllByRole('heading',{level:3}).map(x=>x.textContent),filterProducts(c).map(p=>p.name));
 }
 fireEvent.click(ui.getByRole('button',{name:'Todos'}));
 assert.equal(ui.getAllByRole('article').length,6);
 cleanup();
});

test('Menu abre, fecha com Escape, devolve foco e fecha após navegação', () => {
 const ui=render(<PathnameContext.Provider value="/"><Header/></PathnameContext.Provider>);
 const button=ui.getByRole('button',{name:/Menu/});
 assert.equal(button.getAttribute('aria-expanded'),'false');
 fireEvent.click(button);assert.equal(button.getAttribute('aria-expanded'),'true');
 fireEvent.keyDown(document,{key:'Escape'});assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(document.activeElement,button);
 fireEvent.click(button);const story=ui.getByRole('link',{name:'Nossa história'});story.addEventListener('click',e=>e.preventDefault());fireEvent.click(story);assert.equal(button.getAttribute('aria-expanded'),'false');
 assert.equal(ui.getByRole('link',{name:'Início'}).getAttribute('aria-current'),'page');
 cleanup();
});
