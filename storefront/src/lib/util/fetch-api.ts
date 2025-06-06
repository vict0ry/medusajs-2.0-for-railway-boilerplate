

interface PostAttributes {
  Title: string;
  Slug: string;
  Content: string;
  publishedAt: string;
  CoverImage: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  Seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface BlogPost {
  id: number;
  attributes: PostAttributes;
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface BlogsResponse {
  data: BlogPost[];
  meta: {
    pagination: PaginationMeta;
  };
}



// fetching blogs

export const fetchBlogs = async (page: number = 1, pageSize: number = 9): Promise<BlogsResponse> => {
  try {
    const apiUrl = `${process.env.STRIPE_API_URL}/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: 0
        }
      }
    };
  }
};



//fetchBlogBySlug

export const fetchBlogBySlug = async (slug: string) => {
    
    const response = await fetch(`${process.env.STRIPE_API_URL}/api/posts/?populate=*&filters[Slug][$eq]=${slug}`);
    const data = await response.json();
    if (!data.data) {
        return null; 
    }
    
    return data.data[0];
}
