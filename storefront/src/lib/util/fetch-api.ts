export const fetchBlogs = async () => {
    const response = await fetch(`${process.env.STRIPE_API_URL}/api/posts?populate=*`);
    const data = await response.json();
    return data.data;
}

//fetchBlogBySlug

export const fetchBlogBySlug = async (slug: string) => {
    
    const response = await fetch(`${process.env.STRIPE_API_URL}/api/posts/?populate=*&filters[Slug][$eq]=${slug}`);
    const data = await response.json();
    if (!data.data) {
        return null; // Return null if no blog is found
    }
    
    return data.data[0];
}
