import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import NewProducts from "@modules/home/components/new-products"
import FeaturedBlogs from "@modules/home/components/featured-blogs"
import CategoryShowcase from "@modules/home/components/category-showcase"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Prášek Archivy | CBDsvet.cz",
  description:
    "CBD prášek je vyroben z konopí a obsahuje vysoké množství CBD. Je to přírodní produkt, který se používá k léčbě různých zdravotních problémů.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <NewProducts region={region} countryCode={countryCode} />
      <FeaturedProducts region={region} countryCode={countryCode} />
      <FeaturedBlogs />
    </>
  )
}
