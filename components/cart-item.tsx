"use client"

import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted/50">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex items-center rounded-md border">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <div className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

