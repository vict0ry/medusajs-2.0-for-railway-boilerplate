import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getProductsList } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import InteractiveLink from "@modules/common/components/interactive-link"

export default async function NewProducts({
    region,
    countryCode,
}: {
    region: HttpTypes.StoreRegion
    countryCode: string
}) {
    const { response } = await getProductsList({
        queryParams: {
            limit: 4,
            order: "created_at",
        },
        countryCode,
    })

    if (!response.products.length) {
        return null
    }

    return (
        <div className="content-container py-8 small:py-16">
            <div className="flex flex-col small:flex-row justify-between items-start small:items-center mb-8">
                <div className="flex flex-col gap-y-2">
                    <Text className="text-2xl-semi">New Arrivals</Text>
                    <Text className="text-base-regular text-ui-fg-subtle">
                        Check out our latest products
                    </Text>
                </div>
                <div className="mt-4 small:mt-0">
                    <InteractiveLink href="/store?sortBy=created_at">
                        View all
                    </InteractiveLink>
                </div>
            </div>
            <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 small:gap-x-6 small:gap-y-12">
                {response.products.map((product) => (
                    <div key={product.id} className="w-full">
                        <ProductPreview product={product} region={region} isFeatured />
                    </div>
                ))}
            </div>
        </div>
    )
} 