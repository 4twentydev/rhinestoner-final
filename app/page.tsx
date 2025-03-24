import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import CategoryCard from "@/components/category-card";
import { featuredProducts, categories } from "@/lib/data";
import HeroVideo from "./components/hero-video/index";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm dark:bg-background/60" />
        <div className="relative z-10 container px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Shine Brighter. <span className="text-primary">Be Extra.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground md:text-xl">
            Luxury rhinestone accessories that make a statement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Items Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              New Arrivals
            </h2>
            <Link
              href="/products"
              className="flex items-center text-sm font-medium text-primary"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[300px]">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-8 md:text-3xl">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                The Luxe Collection
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our premium line of rhinestone-encrusted accessories, designed
                for those who appreciate the finer things in life.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/products?collection=luxe">Explore Collection</Link>
              </Button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Luxe Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-8 md:text-3xl">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <p className="text-muted-foreground">
                "I get compliments on my rhinestone lighter case every time I
                pull it out. Absolutely love it!"
              </p>
              <p className="mt-4 font-medium">— Alex T.</p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <p className="text-muted-foreground">
                "The quality is amazing. These pieces are so well made and the
                rhinestones are securely attached."
              </p>
              <p className="mt-4 font-medium">— Jamie K.</p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <p className="text-muted-foreground">
                "My phone case is gorgeous and has lasted for months without
                losing a single stone. Worth every penny!"
              </p>
              <p className="mt-4 font-medium">— Morgan L.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
