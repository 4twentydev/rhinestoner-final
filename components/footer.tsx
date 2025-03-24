import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-bold">Rhinestoner</h3>
            <p className="text-sm text-muted-foreground">Luxury rhinestone accessories that make a statement.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=lighters" className="text-muted-foreground hover:text-foreground">
                  Lighters
                </Link>
              </li>
              <li>
                <Link href="/products?category=cases" className="text-muted-foreground hover:text-foreground">
                  Cases
                </Link>
              </li>
              <li>
                <Link href="/products?category=containers" className="text-muted-foreground hover:text-foreground">
                  Containers
                </Link>
              </li>
              <li>
                <Link href="/products?category=phone-cases" className="text-muted-foreground hover:text-foreground">
                  Phone Cases
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Connect</h4>
            <div className="flex space-x-3">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Also find us on{" "}
              <Link href="https://etsy.com" className="underline hover:text-foreground">
                Etsy
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rhinestoner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

