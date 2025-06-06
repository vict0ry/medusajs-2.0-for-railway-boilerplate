import { fetchBlogBySlug, fetchBlogs } from "@lib/util/fetch-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export async function generateStaticParams({ 
  params 
}: { 
  params: { countryCode: string } 
}) {
  const blogs = await fetchBlogs();
  return blogs.data.map((blog: any) => ({
    countryCode: params.countryCode,
    id: blog.id.toString(), // Ensure id is string
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: { countryCode: string; slug: string } 
}) {
  const blog = await fetchBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }
  
  return {
    title: blog.Title,
    description: blog.Content.substring(0, 160),
    openGraph: {
      title: blog.Title,
      description: blog.Content.substring(0, 160),
      images: [
        {
          url: `${process.env.STRIPE_API_URL}${blog.CoverImage.url}`,
          width: blog.CoverImage.width || 1200,
          height: blog.CoverImage.height || 630,
          alt: blog.alternativeText || blog.Title,
        },
      ],
    },
  };
}


const BlogDetailsPage = async ({ 
  params 
}: { 
  params: { countryCode: string; slug: string } 
}) => {
  const blog = await fetchBlogBySlug(params.slug);
  
  if (!blog) {
    notFound();
  }
  
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {blog.Title}
            </h1>
            
            <div className="mt-6 flex items-center">
              <time 
                dateTime={blog.publishedAt} 
                className="text-gray-500"
              >
                {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>
          
          <div className="relative aspect-[16/9] w-full rounded-xl bg-gray-100 shadow-lg">
            <Image
              alt={blog.alternativeText || blog.Title}
              src={`${process.env.STRIPE_API_URL}${blog.CoverImage.url}`}
              fill
              className="rounded-xl object-cover"
              priority
            />
          </div>
          
          <div className="prose prose-lg mx-auto mt-12 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.Content }} />
          </div>
          
          <footer className="mt-16 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <Link
                href={`/${params.countryCode}/blog`}
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                ← Back to all articles
              </Link>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share on Twitter"
                >
                  {/* <TwitterIcon className="h-5 w-5" /> */}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share on Facebook"
                >
                  {/* <FacebookIcon className="h-5 w-5" /> */}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share on LinkedIn"
                >
                  {/* <LinkedInIcon className="h-5 w-5" /> */}
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

// Social icons components remain the same as previous example
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  /* ... */
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  /* ... */
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  /* ... */
}

export default BlogDetailsPage;