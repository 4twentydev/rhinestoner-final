"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { ArrowLeft, Star, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { useCart } from "@/lib/use-cart"
import { toast } from "@/hooks/use-toast"
import ProductCard from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, product.category)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-md border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-sm text-muted-foreground">Free shipping on orders over $50</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantity</span>
              <div className="flex items-center rounded-md border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <Check className="mr-2 h-4 w-4" /> Add to Cart
            </Button>

            <Button variant="outline" size="lg" className="w-full">
              Add to Wishlist
            </Button>
          </div>

          <div className="space-y-2 border-t pt-6">
            <p className="flex items-center justify-between text-sm">
              <span className="font-medium">Material</span>
              <span className="text-muted-foreground">Premium rhinestones, metal</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="font-medium">Dimensions</span>
              <span className="text-muted-foreground">{product.dimensions || "Varies by product"}</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="font-medium">SKU</span>
              <span className="text-muted-foreground">{product.sku || `RS-${params.id}`}</span>
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

