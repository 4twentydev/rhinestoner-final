import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md h-full",
        className,
      )}
    >
      <div className="aspect-square overflow-hidden relative bg-muted/30">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          priority={product.isNew}
        />
      </div>
      {product.isNew && (
        <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
          New
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-auto pt-4">
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

