import { Button, Heading, Text } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <Heading
            level="h1"
            className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl"
          >
            Discover Your Perfect Style
          </Heading>
          <Text className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Explore our curated collection of premium products designed to elevate your lifestyle
          </Text>
          <div className="flex gap-4">
            <Link href="/collections">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
                Shop Now
              </Button>
            </Link>
            <Link href="/collections/new-arrivals">
              <Button variant="secondary" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full">
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <Heading level="h2" className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative h-80 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Text className="text-2xl font-semibold text-white">
                    {category.name}
                  </Text>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-900">
                  {benefit.icon}
                </div>
                <Heading level="h3" className="text-xl font-semibold mb-2">
                  {benefit.title}
                </Heading>
                <Text className="text-gray-600">
                  {benefit.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = [
  {
    id: 1,
    name: "New Arrivals",
    href: "/collections/new-arrivals",
    image: "/category-new.jpg"
  },
  {
    id: 2,
    name: "Best Sellers",
    href: "/collections/best-sellers",
    image: "/category-best.jpg"
  },
  {
    id: 3,
    name: "Special Offers",
    href: "/collections/special-offers",
    image: "/category-special.jpg"
  }
]

const benefits = [
  {
    id: 1,
    title: "Free Shipping",
    description: "On all orders over $50",
    icon: "🚚"
  },
  {
    id: 2,
    title: "Easy Returns",
    description: "30-day return policy",
    icon: "↩️"
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: "🔒"
  }
]

export default Hero
