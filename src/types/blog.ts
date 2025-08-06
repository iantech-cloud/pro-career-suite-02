export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  views: number;
  featured: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface CreateBlogPostRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  id: string;
}