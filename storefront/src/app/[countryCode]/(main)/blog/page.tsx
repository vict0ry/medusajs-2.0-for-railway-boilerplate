import BlogsPage from '@modules/blog/components'
import React from 'react'

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page;

  return (
    <div>
        <BlogsPage currentPage={currentPage} />
    </div>
  )
}

export default page