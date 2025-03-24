"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { categories, collections } from "@/lib/data"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [collectionOpen, setCollectionOpen] = useState(true)

  const currentCategory = searchParams.get("category")
  const currentCollection = searchParams.get("collection")

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    return params.toString()
  }

  const handleCategoryClick = (slug: string) => {
    router.push(`/products?${createQueryString("category", slug === currentCategory ? "" : slug)}`)
  }

  const handleCollectionClick = (slug: string) => {
    router.push(`/products?${createQueryString("collection", slug === currentCollection ? "" : slug)}`)
  }

  return (
    <div className="space-y-6">
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Categories</h3>
            <ChevronDown className={cn("h-4 w-4 transition-transform", categoryOpen && "rotate-180")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn("w-full justify-start", currentCategory === category.slug && "bg-muted font-medium")}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <span className="flex-1 text-left">{category.name}</span>
                {currentCategory === category.slug && <Check className="h-4 w-4 ml-2" />}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={collectionOpen} onOpenChange={setCollectionOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Collections</h3>
            <ChevronDown className={cn("h-4 w-4 transition-transform", collectionOpen && "rotate-180")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-1">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant="ghost"
                className={cn("w-full justify-start", currentCollection === collection.slug && "bg-muted font-medium")}
                onClick={() => handleCollectionClick(collection.slug)}
              >
                <span className="flex-1 text-left">{collection.name}</span>
                {currentCollection === collection.slug && <Check className="h-4 w-4 ml-2" />}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

