import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Categories from "./categories-section"
import { getCategoriesList } from "@lib/data/categories"
import Image from "next/image"
import Logo from "/public/logo.svg"
import { FiSearch, FiUser } from "react-icons/fi";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import Link from "next/link"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { product_categories } = await getCategoriesList()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* <div className="hidden md:flex  border-b border-ui-border-base bg-white py-2 px-4">

        <div className="flex items-center content-container text-sm text-gray-500 justify-between ">
          <Link href="/kontakty">
            Kontakt
          </Link>
          
           <Link href="/kontakty">
            Při nákupu nad 2000,- doprava zdarma 
          </Link>
        </div>
      </div> */}
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} product_categories={product_categories} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <div>
                <Image src={Logo} alt=" Logo" width={130} height={40} />
              </div>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-3 lg:gap-x-6 h-full flex-1 basis-0 justify-end">
            <LocalizedClientLink
              className="hover:text-black font-semibold hidden sm:block"
              href="/search"
              scroll={false}
            >
              <div className="flex items-center lg:gap-x-1">
                <IoSearch size={24} />
                <span className="hidden lg:block">Search</span>
              </div>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-black font-semibold hidden sm:block"
              href="/account"
            >
              <div className="flex items-center lg:gap-x-1">
                <FiUser size={24} />
                <span className="hidden lg:block">Account</span>
              </div>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-black font-semibold"
                  href="/cart"
                >
                  <div className="flex items-center lg:gap-x-1">

                    <span className="hidden lg:block">  <IoCartOutline size={24} /> (0)</span>
                  </div>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
      <div className="hidden md:block">
        <Categories product_categories={product_categories} />
      </div>
    </div>
  )
}
