'use client'

import React, { Fragment, useState } from 'react'
import { Popover, Transition } from "@headlessui/react"
import { HiChevronDown } from "react-icons/hi";
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from '@medusajs/ui';
import clsx from 'clsx';
import { StoreProductCategory } from '@medusajs/types';

const Categories = ({ product_categories }: { product_categories: StoreProductCategory[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryData, setCurrentCategoryData] = useState<StoreProductCategory>()
  return (
    <>
      <div
        onMouseLeave={() => setIsOpen(false)}
        className='relative bg-stone-800 border-b border-gray-400'
      >
        {product_categories && product_categories.length ? (
          <div className="h-10 w-full"
            onMouseEnter={() => setIsOpen(false)}
          >
            <div className='content-container overflow-x-auto no-scrollbar h-full flex sm:justify-center justify-start items-center gap-x-6  '>
              <div className='h-full flex '>
                {product_categories && product_categories.map((category) => {
                  if (category.parent_category) {
                    return
                  }
                  const children =
                    category.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null
                  return (
                    <div key={category.id} className={clsx(" h-full items-center flex px-6 hover:bg-white text-white hover:text-black",{
                      "bg-white text-black": isOpen && category.id === categoryData?.id
                    })}
                      onMouseEnter={() => {
                        if (children.length) {
                          setCurrentCategoryData(category)
                          setIsOpen(true)
                        } else {
                          setIsOpen(false)
                        }
                        if (category.id !== categoryData?.id) {
                          setCurrentCategoryData(category)
                        }
                      }}
                    >
                      <LocalizedClientLink href={`/categories/${category?.handle}`}>
                        <div className="flex space-x-1 h-full items-center"
                        >
                          <p className={clsx("text-sm font-semibold whitespace-nowrap",{
                            "text-black": isOpen && category.id === categoryData?.id
                          })}>{category.name}</p>
                          {children.length ? (<HiChevronDown />) : null}
                        </div>
                      </LocalizedClientLink>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        ) : null}

        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-800"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div>
            {isOpen && (
              <>
                <div className='w-full bg-white absolute py-6 z-20'>
                  <div className='content-container'>
                    <LocalizedClientLink href={`/categories/${categoryData?.handle}`}>
                      <Text className='text-2xl w-fit font-semibold py-4 hover:text-black'>
                        {categoryData?.name}
                      </Text>
                    </LocalizedClientLink>

                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-4 '>
                      {categoryData?.category_children.length ? (categoryData.category_children.map((child) => {
                        return (
                          <LocalizedClientLink href={`/categories/${child?.handle}`}
                            key={child.id}
                            className='cool-link-white'
                          >
                            <p
                              className='hover:text-black w-fit font-bold'
                            >
                              {child.name}
                            </p>
                            <span className='text-sm'>{child.description}</span>
                          </LocalizedClientLink>
                        )
                      })) : null
                      }
                    </div>
                  </div>
                </div>

                {/* Backdrop filter */}
                <div className='absolute h-[100vh] opacity-50 w-full bg-black z-10'
                  onMouseEnter={() => setIsOpen(false)}
                >
                </div>
              </>
            )}
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Categories