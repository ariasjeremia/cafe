export type CategoryId = "origen" | "mezcla" | "decaf";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  farm: string;
  category: CategoryId;
  process: string;
  varietal: string;
  altitude: string;
  sca: number;
  roastLevel: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  price: number;
  weight: number;
  image: string;
  description: string;
  brewing: { method: string; ratio: string; temp: string; time: string };
  stock: number;
  rating: number;
  reviews: number;
  tag?: string;
}

export const CATEGORIES: { id: CategoryId | "todo"; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "origen", label: "Origen único" },
  { id: "mezcla", label: "Mezclas" },
  { id: "decaf", label: "Descafeinado" },
];

export const FREE_SHIPPING_FROM = 30;
export const SHIPPING_COST = 3.9;
export const MAX_PER_ORDER = 12;

export const MASTHEAD_IMAGE =
  "https://image.qwenlm.ai/generated-images/17ce644e-418b-4c29-b43b-ebef9138a533/_result.png";

const img = (id: string) =>
  `https://image.qwenlm.ai/generated-images/${id}/_result.png`;

export const eur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const PRODUCTS: Product[] = [
  {
    id: "etiopia-yirgacheffe",
    name: "Idido · Yirgacheffe",
    origin: "Etiopía",
    region: "Gedeo, Yirgacheffe",
    farm: "Cooperativa Idido",
    category: "origen",
    process: "Lavado",
    varietal: "Heirloom",
    altitude: "1.950–2.200 m",
    sca: 88,
    roastLevel: 2,
    notes: ["Jazmín", "Bergamota", "Melocotón"],
    price: 14.5,
    weight: 250,
    image: img("d78c690e-b11b-4aab-8d40-212b4f4d8fbd"),
    description:
      "Un clásico de Gedeo que perfuma la tostadora entera. Floral y luminoso, con una acidez de bergamota que se abre en melocotón maduro al enfriar. Lo tostamos claro para no pisar su delicadeza: es el café que sirve de bienvenida a quien llega a Lumbre.",
    brewing: { method: "V60 / Filtro", ratio: "1:16", temp: "92 °C", time: "2:45" },
    stock: 14,
    rating: 4.9,
    reviews: 126,
    tag: "Más vendido",
  },
  {
    id: "kenya-nyeri",
    name: "Gatomboya AA · Nyeri",
    origin: "Kenia",
    region: "Nyeri, Monte Kenia",
    farm: "Gatomboya Factory",
    category: "origen",
    process: "Lavado doble",
    varietal: "SL28 · SL34",
    altitude: "1.800 m",
    sca: 89,
    roastLevel: 2,
    notes: ["Grosella negra", "Pomelo", "Vino tinto"],
    price: 16.0,
    weight: 250,
    image: img("cc73ce4d-a118-4097-be85-f4bdcaed9d18"),
    description:
      "El lote más intenso de la temporada: un AA de Nyeri con doble fermentación que entrega grosella negra y una acidez vínica casi eléctrica. Producción limitada a 18 sacos — cuando se acaba, no vuelve hasta la próxima cosecha.",
    brewing: { method: "V60 / Chemex", ratio: "1:15", temp: "93 °C", time: "3:00" },
    stock: 9,
    rating: 4.9,
    reviews: 74,
    tag: "Edición limitada",
  },
  {
    id: "colombia-huila",
    name: "El Mirador · Huila",
    origin: "Colombia",
    region: "San Agustín, Huila",
    farm: "Finca El Mirador",
    category: "origen",
    process: "Honey",
    varietal: "Caturra · Pink Bourbon",
    altitude: "1.750 m",
    sca: 86,
    roastLevel: 3,
    notes: ["Panela", "Cereza", "Almendra"],
    price: 12.9,
    weight: 250,
    image: img("edf3308c-95ea-435c-b8b1-ab62c7c013b4"),
    description:
      "Proceso honey que deja justo el dulzor de la miel de caña sin perder la cereza fresca. Redondo y jugoso, funciona igual de bien en filtro que en moka: es el café de cabecera para quien quiere algo fiable y con carácter.",
    brewing: { method: "Filtro / Moka", ratio: "1:15", temp: "93 °C", time: "3:00" },
    stock: 22,
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "brasil-cerrado",
    name: "Boa Vista · Cerrado",
    origin: "Brasil",
    region: "Patrocínio, Minas Gerais",
    farm: "Fazenda Boa Vista",
    category: "origen",
    process: "Natural",
    varietal: "Mundo Novo",
    altitude: "1.150 m",
    sca: 84,
    roastLevel: 4,
    notes: ["Cacao", "Avellana", "Azúcar moreno"],
    price: 11.5,
    weight: 250,
    image: img("c38f5988-dff2-42b8-932a-eed86a6835d4"),
    description:
      "Un natural seco de cuerpo denso, con cacao amargo y avellana tostada. Pensado para aguantar leche sin desaparecer: es la base de nuestro flat white y el café que recomendamos para máquina de espresso en casa.",
    brewing: { method: "Espresso / Moka", ratio: "1:2", temp: "93 °C", time: "0:28" },
    stock: 30,
    rating: 4.6,
    reviews: 143,
  },
  {
    id: "mezcla-alba",
    name: "Alba · Mezcla de la casa",
    origin: "Brasil & Etiopía",
    region: "Cerrado + Guji",
    farm: "Dos fincas, un tueste",
    category: "mezcla",
    process: "Natural & lavado",
    varietal: "Mezcla de temporada",
    altitude: "1.150–2.100 m",
    sca: 85,
    roastLevel: 3,
    notes: ["Chocolate", "Naranja", "Miel"],
    price: 10.9,
    weight: 250,
    image: img("82c0a5ec-ead4-42c7-a1c3-a74d467130d4"),
    description:
      "Nuestra receta estable: chocolate y naranja en equilibrio, con un final a miel que dura un buen rato. Diseñada para el espresso diario y para quienes buscan consistencia taza tras taza sin renunciar a que el café sepa a algo.",
    brewing: { method: "Espresso", ratio: "1:2", temp: "92 °C", time: "0:27" },
    stock: 40,
    rating: 4.7,
    reviews: 210,
    tag: "Favorito espresso",
  },
  {
    id: "decaf-nube",
    name: "Nube · Descafeinado",
    origin: "Colombia",
    region: "Cauca",
    farm: "Pequeños productores",
    category: "decaf",
    process: "Sugarcane E.A.",
    varietal: "Castillo",
    altitude: "1.700 m",
    sca: 84,
    roastLevel: 3,
    notes: ["Caramelo", "Manzana roja", "Té negro"],
    price: 11.9,
    weight: 250,
    image: img("1dc1360b-d84a-43a4-bef2-a36dbc2ec3b6"),
    description:
      "Descafeinado por caña de azúcar en origen, el método que mejor respeta el sabor del grano. Caramelo y manzana roja con cuerpo suave: nadie nota que es descafeinado — y eso es exactamente lo que buscábamos.",
    brewing: { method: "Filtro / Prensa", ratio: "1:15", temp: "91 °C", time: "4:00" },
    stock: 18,
    rating: 4.5,
    reviews: 61,
  },
];
