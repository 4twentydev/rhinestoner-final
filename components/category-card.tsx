import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
  className?: string
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-heading text-xl font-bold">{category.name}</h3>
        </div>
      </div>
    </Link>
  )
}

