import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, Select, clx } from "@medusajs/ui"
import { useEffect, useState } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  const isMobile = useIsMobile()

  const handleSelectChange = (newValue: string) => {
    handleChange(newValue)
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-y-2">
        <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
        <Select
          value={value}
          onValueChange={handleSelectChange}
          data-testid={dataTestId}
        >
          <Select.Trigger className="w-full">
            <Select.Value placeholder="Select an option" />
          </Select.Trigger>
          <Select.Content>
            {items?.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                data-testid="select-item"
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    )
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-x-2 items-center", {
              "ml-[-23px]": i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": i.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
