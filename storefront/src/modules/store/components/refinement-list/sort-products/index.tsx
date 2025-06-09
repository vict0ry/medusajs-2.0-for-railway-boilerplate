"use client"

import { Select, Text } from "@medusajs/ui"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Text className="txt-compact-small-plus text-ui-fg-muted">Sort by</Text>
      <Select
        value={sortBy}
        onValueChange={handleChange}
        data-testid={dataTestId}
      >
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Select sorting option" />
        </Select.Trigger>
        <Select.Content>
          {sortOptions.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              data-testid="select-item"
            >
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export default SortProducts
