export const categories = ["Todos", "Pães artesanais", "Confeitaria", "Salgados", "Cafés"] as const;
export type Category = typeof categories[number];
export type Product = { id: string; name: string; category: Exclude<Category, "Todos">; description: string; price: number; unit: string; image: string; alt: string; note?: string };
export const products: Product[] = [
 { id: "campanha", name: "Pão de campanha", category: "Pães artesanais", description: "Casca bem dourada, miolo úmido e um leve toque de acidez. Farinha, água, sal e tempo.", price: 26, unit: "un. · 500 g", image: "bread", alt: "Pães artesanais dourados e polvilhados com farinha", note: "O pão da casa" },
 { id: "croissant", name: "Croissant de manteiga", category: "Confeitaria", description: "Camadas delicadas que se desfazem na primeira mordida. Feito para acompanhar um café.", price: 12, unit: "unidade", image: "croissant", alt: "Croissants de manteiga com camadas douradas", note: "Camada por camada" },
 { id: "cappuccino", name: "Cappuccino da casa", category: "Cafés", description: "Espresso, leite vaporizado e uma espuma fina. O equilíbrio está na simplicidade.", price: 13, unit: "180 ml", image: "latte", alt: "Café com leite e desenho na espuma" },
 { id: "focaccia", name: "Focaccia de alecrim", category: "Salgados", description: "Massa alta, azeite de oliva e alecrim. Dourada por fora, macia por dentro.", price: 16, unit: "fatia · 150 g", image: "focaccia", alt: "Focaccia dourada com ervas e azeite" },
 { id: "cookie", name: "Cookie de chocolate", category: "Confeitaria", description: "Borda crocante, centro macio e pedaços generosos de chocolate meio amargo.", price: 9, unit: "unidade", image: "cookie", alt: "Cookies artesanais com pedaços de chocolate" },
 { id: "com-leite", name: "Café com leite", category: "Cafés", description: "Café de torra média e leite quente na medida. Uma xícara para acompanhar a conversa.", price: 11, unit: "180 ml", image: "coffee", alt: "Xícaras de café com leite sobre uma mesa" },
];
export function filterProducts(category: Category) { return category === "Todos" ? products : products.filter(p => p.category === category); }
export const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
