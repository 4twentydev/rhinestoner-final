import ProductCard from "@/components/product-card"
import { getAllProducts } from "@/lib/data"

interface ProductGridProps {
  category?: string
  collection?: string
}

export default function ProductGrid({ category, collection }: ProductGridProps) {
  const products = getAllProducts({ category, collection })

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

