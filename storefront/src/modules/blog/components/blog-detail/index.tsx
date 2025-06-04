import { fetchBlogById, fetchBlogs } from "@lib/util/fetch-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@lib/util/date-utils";
import Link from "next/link";

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog: any) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: number } }) {
  const blog = await fetchBlogById(params.id);
  
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

const BlogDetailsPage = async ({ params }: { params: { id: number } }) => {
  const blog = await fetchBlogById(params.id);
  
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
                {formatDate(blog.publishedAt, "long")}
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
                href="/blog"
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
                  <TwitterIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

// Simple social icons (you might want to replace with actual SVG components)
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default BlogDetailsPage;