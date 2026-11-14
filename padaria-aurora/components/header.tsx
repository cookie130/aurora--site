"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, Logo } from "./brand";
const links = [{ href: "/", label: "Início" }, { href: "/nossa-historia/", label: "Nossa história" }, { href: "/produtos/", label: "Produtos" }, { href: "/contato/", label: "Contato" }];
export function Header() {
 const path = usePathname(); const [open, setOpen] = useState(false); const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => { function key(e: KeyboardEvent) { if (e.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } } document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [open]);
 return <header className="site-header"><div className="header-inner"><Link href="/" className="logo-link" aria-label="Padaria Aurora, início" onClick={() => setOpen(false)}><Logo/></Link><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Fechar" : "Menu"}<span aria-hidden="true">{open ? "×" : "☰"}</span></button><nav id="main-navigation" aria-label="Navegação principal" className={open ? "nav open" : "nav"}>{links.map(l => <Link key={l.href} href={l.href} aria-current={path.replace(/\/$/, "") === l.href.replace(/\/$/, "") ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</Link>)}<Link href="/contato/#visita" className="header-cta" onClick={() => setOpen(false)}>Venha nos visitar <Arrow diagonal/></Link></nav></div></header>;
}
