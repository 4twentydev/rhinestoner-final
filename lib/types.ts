export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  collection?: string
  isNew?: boolean
  dimensions?: string
  sku?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface Collection {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

