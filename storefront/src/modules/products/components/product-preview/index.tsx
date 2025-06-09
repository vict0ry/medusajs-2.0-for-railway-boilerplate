import { Button, Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  const hasVariants = product.variants && product.variants.length > 1

  return (
    <div className="group">
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between">
            <Text className="text-ui-fg-subtle" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
      <div className="mt-4">
        {hasVariants ? (
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <Button variant="secondary" className="w-full">
              View More
            </Button>
          </LocalizedClientLink>
        ) : (
          <Button
            variant="primary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic will be handled by the product page
              window.location.href = `/products/${product.handle}`
            }}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  )
}
