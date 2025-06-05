"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes, StoreProductCategory } from "@medusajs/types"
import { Disclosure } from "@headlessui/react"
import { FaChevronDown, FaChevronRight } from "react-icons/fa6"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Categories: "#",
  Search: "/search",
  Blog: "/blog",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions, product_categories }: { regions: HttpTypes.StoreRegion[] | null, product_categories: StoreProductCategory[] }) => {
  const toggleState = useToggleState()
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <GiHamburgerMenu size={20} />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    {/* <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        if (name !== "Categories") {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                onClick={close}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                          )
                        } else {
                          return (
                            <>
                              <Disclosure as="div"
                                className={'w-full'}
                              >
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button
                                      className={'w-full'}
                                    >
                                      <li key={name}
                                        className="w-full"
                                      >
                                        <div className="flex items-center justify-between cursor-pointer hover:text-ui-fg-disabled">
                                          <p
                                            className="text-3xl leading-10 "
                                          >
                                            {name}
                                          </p>
                                          <FaChevronDown
                                            className={classNames(
                                              open ? 'rotate-180 text-gray-400' : 'text-white',
                                              'ml-auto h-5 w-5 shrink-0'
                                            )}
                                            aria-hidden="true"
                                          />
                                        </div>
                                      </li>
                                    </Disclosure.Button>
                                    <Disclosure.Panel as="ul" className="mt-3 px-2  pl-4 ">
                                      <div className="pl-1 border-l border-gray-400 space-y-2">
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
                                            <li key={category.id}>
                                              <LocalizedClientLink
                                                href={`/categories/${category?.handle}`}
                                              >
                                                <Disclosure.Button
                                                  className={'block rounded-md pr-2 space-y-2 text-xl leading-6 '
                                                  }
                                                >
                                                  <div className="flex flex-col items-start">
                                                    <span className="hover:text-ui-fg-disabled cursor-pointer">
                                                      {category.name}
                                                    </span>
                                                    {
                                                      children && children.length ? (
                                                        <div className="pt-2 text-left border-l border-gray-400">
                                                          {
                                                            children.map((child) => {
                                                              return (
                                                                <LocalizedClientLink
                                                                  href={`/categories/${child?.handle}`}
                                                                  key={child.id}
                                                                >
                                                                  <p className="hover:text-gray-200 text-sm cursor-pointer pl-4">{child.name}</p>
                                                                </LocalizedClientLink>
                                                              )
                                                            })
                                                          }
                                                        </div>
                                                      ) : null
                                                    }
                                                  </div>

                                                </Disclosure.Button>
                                              </LocalizedClientLink>

                                            </li>
                                          )
                                        }

                                        )}
                                      </div>

                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </>
                          )
                        }

                      })}
                    </ul> */}
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        if (name !== "Categories") {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="text-2xl leading-3 hover:text-ui-fg-disabled"
                                onClick={close}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                          );
                        } else {
                          return (
                            <Disclosure as="div" className="w-full" key={name}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="w-full">
                                    <li className="w-full">
                                      <div className="flex items-center justify-between cursor-pointer hover:text-ui-fg-disabled">
                                        <p className="text-2xl leading-3">
                                          {name}
                                        </p>
                                        <FaChevronDown
                                          className={classNames(
                                            open ? 'rotate-180' : 'rotate-0',
                                            'ml-auto h-5 w-5 shrink-0 transition-transform'
                                          )}
                                        />
                                      </div>
                                    </li>
                                  </Disclosure.Button>
                                  <Disclosure.Panel as="ul" className="mt-3 px-2 pl-4">
                                    <div className="pl-1 border-l border-gray-400 space-y-2">
                                      {product_categories?.map((category) => {
                                        if (category.parent_category) return null;

                                        const children =
                                          category.category_children?.map((child) => ({
                                            name: child.name,
                                            handle: child.handle,
                                            id: child.id,
                                          })) || [];

                                        if (children.length > 0) {
                                          return (
                                            <Disclosure
                                              as="li"
                                              key={category.id}
                                              className="w-full"
                                            >
                                              {({ open: childOpen }) => (
                                                <>
                                                  <Disclosure.Button className="w-full flex items-center gap-x-3 hover:text-ui-fg-disabled cursor-pointer text-xl leading-6">
                                                    <span>{category.name}</span>
                                                    <FaChevronDown
                                                      className={classNames(
                                                        childOpen ? 'rotate-180' : 'rotate-0',
                                                        'h-3 w-3 shrink-0 transition-transform'
                                                      )}
                                                    />
                                                  </Disclosure.Button>
                                                  <Disclosure.Panel className="pl-4 border-l border-gray-400">
                                                    <div className="space-y-2 pt-2">
                                                      {children.map((child) => (
                                                        <LocalizedClientLink
                                                          href={`/categories/${child.handle}`}
                                                          key={child.id}
                                                          className="block text-sm hover:text-gray-200 pl-4"
                                                          onClick={close}
                                                        >
                                                          {child.name}
                                                        </LocalizedClientLink>
                                                      ))}
                                                    </div>
                                                  </Disclosure.Panel>
                                                </>
                                              )}
                                            </Disclosure>
                                          );
                                        } else {
                                          return (
                                            <li key={category.id} className="w-full">
                                              <LocalizedClientLink
                                                href={`/categories/${category.handle}`}
                                                className="text-xl leading-6 hover:text-ui-fg-disabled"
                                                onClick={close}
                                              >
                                                {category.name}
                                              </LocalizedClientLink>
                                            </li>
                                          );
                                        }
                                      })}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          );
                        }
                      })}
                    </ul>

                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()}  Store. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
