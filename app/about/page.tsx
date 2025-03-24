import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:py-12 min-h-[calc(100vh-16rem)]">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-center md:text-4xl">Our Story</h1>

        <div className="mt-8 space-y-8">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted/30">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Rhinestoner founder in the studio"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold">How It All Started</h2>
            <p className="text-muted-foreground">
              Rhinestoner was born from a simple idea: why should everyday items be boring? Our founder, Jamie, started
              by decorating her own lighter with rhinestones as a fun DIY project. When friends couldn't stop asking
              where she got it, she knew she was onto something special.
            </p>
            <p className="text-muted-foreground">
              What began as a creative outlet quickly turned into a passion for transforming ordinary objects into
              extraordinary accessories. Each piece is meticulously handcrafted, with rhinestones individually placed to
              create stunning, eye-catching designs that make a statement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Behind the scenes of creating rhinestone products"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Rhinestoner products on display"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold">Our Philosophy</h2>
            <p className="text-muted-foreground">
              At Rhinestoner, we believe in embracing maximalism and self-expression. In a world that often tells us to
              tone it down, we encourage you to shine brighter. Our products are designed for those who aren't afraid to
              stand out and be a little extra.
            </p>
            <p className="text-muted-foreground">
              Quality is at the heart of everything we do. We use only premium materials and techniques to ensure that
              your rhinestone accessories not only look amazing but stand the test of time. Each piece undergoes
              rigorous quality control to ensure the rhinestones stay securely in place, even with daily use.
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-6 text-center">
            <h2 className="font-heading text-2xl font-bold">Ready to add some sparkle to your life?</h2>
            <p className="mt-2 text-muted-foreground">
              Browse our collection of handcrafted rhinestone accessories and find the perfect piece to express your
              unique style.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

