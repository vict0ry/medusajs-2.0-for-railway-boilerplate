import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getCollectionsWithProducts } from "@lib/data/collections"
import ProductPreview from "@modules/products/components/product-preview"

export default async function FeaturedProducts({
  region,
  countryCode,
}: {
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  const collections = await getCollectionsWithProducts(countryCode)

  if (!collections || !collections.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">Featured Products</Text>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {collections[0].products?.slice(0, 4).map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
