import { fetchBlogs } from "@lib/util/fetch-api";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Image from "next/image";
import Link from "next/link";

const BlogsPage =  async () => {
    const blogs = await fetchBlogs();
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
            Discover the latest insights, benefits, and research on CBD products to enhance your wellness journey.
            </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog:any) => (
            <article key={blog.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                <Image
                  alt={blog.alternativeText || blog.Title}
                  src={`${process.env.STRIPE_API_URL}${blog.CoverImage.url}`}
                  width={800}
                  height={450}
                  className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime={blog.publishedAt} className="text-gray-500">
                    {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </time>
                  {/* <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={`/blog/${blog.Slug}`}>
                      <span className="absolute inset-0" />
                      {blog.Title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{blog.Content}</p>
                </div>
                 <div className="mt-6">
                  <LocalizedClientLink
                    href={`/blog/${blog.Slug}`}
                    className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    aria-label={`Read more: ${blog.Title}`}
                  >
                    Read more <span aria-hidden="true">→</span>
                  </LocalizedClientLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BlogsPage;
