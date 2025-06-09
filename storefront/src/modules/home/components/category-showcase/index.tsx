import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getCollectionsList } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CategoryShowcase() {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections || !collections.length) {
        return null
    }

    return (
        <div className="content-container py-8 small:py-16">
            <div className="flex flex-col gap-y-2 mb-8">
                <Text className="text-2xl-semi">Shop by Category</Text>
                <Text className="text-base-regular text-ui-fg-subtle">
                    Browse our most popular categories
                </Text>
            </div>
            <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
                {collections.map((collection) => (
                    <LocalizedClientLink
                        key={collection.id}
                        href={`/collections/${collection.handle}`}
                        className="group"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-ui-bg-subtle hover:bg-ui-bg-base transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Text className="text-xl-semi">{collection.title}</Text>
                            </div>
                        </div>
                    </LocalizedClientLink>
                ))}
            </div>
        </div>
    )
} 