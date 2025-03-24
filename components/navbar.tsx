"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, ShoppingCart, User, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/use-cart"
import CartItem from "./cart-item"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, totalPrice, removeItem } = useCart()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-heading text-xl font-bold text-primary md:text-2xl">
              Rhinestoner
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
              <div className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="font-heading text-2xl font-bold text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Rhinestoner
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-heading text-xl font-bold text-primary md:text-2xl">
            Rhinestoner
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme} className="relative">
            <Sun
              className={cn("h-5 w-5 transition-all", theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100")}
            />
            <Moon
              className={cn(
                "absolute h-5 w-5 transition-all",
                theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Cart Button and Sheet */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {items.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
                  </div>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <>
                  <div className="flex flex-1 flex-col gap-5 overflow-hidden">
                    <div className="flex-1 overflow-y-auto py-2">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="font-bold">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button className="w-full">Checkout</Button>
                    </SheetFooter>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* Login Button and Dialog */}
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login to your account</DialogTitle>
                <DialogDescription>Enter your email and password to access your account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit">Login</Button>
                <Separator className="my-2" />
                <Button variant="outline" className="gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <div className="mt-2 text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="#" className="text-primary underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

