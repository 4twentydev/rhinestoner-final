import type { Product, Category, Collection } from "./types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Lighters",
    slug: "lighters",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Cases",
    slug: "cases",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Containers",
    slug: "containers",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Phone Cases",
    slug: "phone-cases",
    image: "/placeholder.svg?height=400&width=400",
  },
];

export const collections: Collection[] = [
  {
    id: "1",
    name: "Luxe Collection",
    slug: "luxe",
  },
  {
    id: "2",
    name: "Essentials",
    slug: "essentials",
  },
  {
    id: "3",
    name: "Limited Edition",
    slug: "limited-edition",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Green Crystal Lighter",
    description:
      "Our signature rhinestone-encrusted lighter that adds a touch of glamour to your everyday carry.",
    price: 19.99,
    image: "/lighter.png?height=600&width=600",
    category: "lighters",
    collection: "luxe",
    isNew: true,
    dimensions: '2.5" x 1" x 0.5"',
    sku: "RS-LTR-001",
  },
  {
    id: "2",
    name: "Sunflower Lighter",
    description:
      "A stunning rhinestone phone case that catches the light from every angle.",
    price: 19.99,
    image: "/subject.png?height=600&width=600",
    category: "phone-cases",
    collection: "essentials",
    dimensions: '6" x 3" x 0.5"',
    sku: "RS-PHN-002",
  },
  {
    id: "3",
    name: "Dazzle Lighter Case",
    description:
      "Protect your lighter in style with this rhinestone-covered case.",
    price: 29.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "cases",
    collection: "essentials",
    isNew: true,
    dimensions: '3" x 1.5" x 0.75"',
    sku: "RS-CSE-003",
  },
  {
    id: "4",
    name: "Sparkle Mini Container",
    description:
      "A small, discreet container adorned with premium rhinestones.",
    price: 24.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "containers",
    collection: "essentials",
    dimensions: '2" x 2" x 1"',
    sku: "RS-CNT-004",
  },
  {
    id: "5",
    name: "Diamond Dust Phone Case - Samsung",
    description:
      "Elevate your Samsung phone with this luxurious rhinestone case.",
    price: 49.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "phone-cases",
    collection: "luxe",
    dimensions: '6.2" x 3" x 0.5"',
    sku: "RS-PHN-005",
  },
  {
    id: "6",
    name: "Celestial Lighter",
    description:
      "A limited edition lighter featuring a celestial-inspired rhinestone pattern.",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "lighters",
    collection: "limited-edition",
    isNew: true,
    dimensions: '2.5" x 1" x 0.5"',
    sku: "RS-LTR-006",
  },
  {
    id: "7",
    name: "Jewel Box Container",
    description:
      "A medium-sized container covered in multi-colored rhinestones.",
    price: 34.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "containers",
    collection: "luxe",
    dimensions: '3" x 3" x 1.5"',
    sku: "RS-CNT-007",
  },
  {
    id: "8",
    name: "Ombre Lighter Case",
    description:
      "A gradient of rhinestones creates a stunning ombre effect on this lighter case.",
    price: 32.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "cases",
    collection: "limited-edition",
    dimensions: '3" x 1.5" x 0.75"',
    sku: "RS-CSE-008",
  },
];

export const featuredProducts = products.filter(
  (product) => product.isNew || product.collection === "luxe"
);

export function getAllProducts({
  category,
  collection,
}: {
  category?: string;
  collection?: string;
}) {
  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (collection && product.collection !== collection) return false;
    return true;
  });
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(id: string, category: string) {
  return products
    .filter((product) => product.id !== id && product.category === category)
    .slice(0, 4);
}
