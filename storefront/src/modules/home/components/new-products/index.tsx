import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getProductsList } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"

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
        <div className="content-container py-12 small:py-24">
            <div className="flex justify-between mb-8">
                <Text className="txt-xlarge">New Arrivals</Text>
            </div>
            <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
                {response.products.map((product) => (
                    <li key={product.id}>
                        <ProductPreview product={product} region={region} isFeatured />
                    </li>
                ))}
            </ul>
        </div>
    )
} 