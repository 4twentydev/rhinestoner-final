import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import ProductFilters from "@/components/product-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const collection =
    typeof searchParams.collection === "string"
      ? searchParams.collection
      : undefined;

  return (
    <div className="container px-4 py-8 md:py-12 min-h-[calc(100vh-16rem)]">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of rhinestone accessories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="order-last md:order-first">
            <ProductFilters />
          </div>
          <div>
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid category={category} collection={collection} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[500px]">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={crypto.randomUUID()}
            className="rounded-lg border bg-background h-full"
          >
            <Skeleton className="aspect-square rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4 mt-4" />
            </div>
          </div>
        ))}
    </div>
  );
}
