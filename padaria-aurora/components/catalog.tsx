"use client";
import { useState } from "react";
import { categories, filterProducts, type Category } from "@/lib/products";
import { ProductCard } from "./ui";
export function Catalog() { const [category, setCategory] = useState<Category>("Todos"); const visible = filterProducts(category); return <><div className="filters" role="group" aria-label="Filtrar produtos por categoria">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="catalog-meta"><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "produto" : "produtos"} · {category === "Todos" ? "Nossa vitrine completa" : category}</p><span>PREÇOS ILUSTRATIVOS</span></div><div className="product-grid catalog-grid">{visible.map(p => <ProductCard key={p.id} product={p}/>)}</div></>; }
