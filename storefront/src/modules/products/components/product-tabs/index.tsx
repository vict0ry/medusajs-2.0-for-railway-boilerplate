"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { Tabs } from "@medusajs/ui"
import { useMemo } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

interface InventoryLevel {
  id: string
  location_name: string
  stocked_quantity: number
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: "Product Information",
        component: <ProductInfoTab product={product} />,
      },
      {
        label: "Inventory Information",
        component: <InventoryInfoTab product={product} />,
      },
      {
        label: "Shipping & Returns",
        component: <ShippingInfoTab />,
      },
    ]
  }, [product])

  return (
    <Tabs defaultValue="product-information" className="w-full">
      <Tabs.List>
        {tabs.map((tab, i) => (
          <Tabs.Trigger
            key={i}
            value={tab.label.toLowerCase().replace(" ", "-")}
            className="flex-1"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab, j) => (
        <Tabs.Content
          key={j}
          value={tab.label.toLowerCase().replace(" ", "-")}
          className="py-8"
        >
          {tab.component}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const InventoryInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-4">
        {product.variants?.map((variant) => (
          <div key={variant.id} className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold mb-2">
              {variant.title || "Default Variant"}
            </h3>
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <span className="font-semibold">SKU:</span>
                <p>{variant.sku || "-"}</p>
              </div>
              <div>
                <span className="font-semibold">Total Inventory:</span>
                <p>{variant.inventory_quantity || 0}</p>
              </div>
              <div>
                <span className="font-semibold">Manage Inventory:</span>
                <p>{variant.manage_inventory ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="font-semibold">Allow Backorder:</span>
                <p>{variant.allow_backorder ? "Yes" : "No"}</p>
              </div>
            </div>

            {(variant as any).inventory_levels && (variant as any).inventory_levels.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Warehouse Inventory:</h4>
                <div className="grid grid-cols-1 gap-y-2">
                  {(variant as any).inventory_levels.map((level: InventoryLevel) => (
                    <div key={level.id} className="flex justify-between items-center">
                      <span>{level.location_name || "Unknown Location"}</span>
                      <span className="font-medium">{level.stocked_quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
