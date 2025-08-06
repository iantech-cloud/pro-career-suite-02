import { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest, BlogCategory } from '@/types/blog';
import apiClient from '@/lib/apiClient';

export const blogService = {
  // Get all blog posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await apiClient.get('/blog/posts');
    return response.data;
  },

  // Get blog post by ID
  getPostById: async (id: string): Promise<BlogPost | null> => {
    const response = await apiClient.get(`/blog/posts/${id}`);
    return response.data;
  },

  // Create new blog post
  createPost: async (data: CreateBlogPostRequest): Promise<BlogPost> => {
    const response = await apiClient.post('/blog/posts', data);
    return response.data;
  },

  // Update blog post
  updatePost: async (data: UpdateBlogPostRequest): Promise<BlogPost> => {
    const response = await apiClient.put(`/blog/posts/${data.id}`, data);
    return response.data;
  },

  // Delete blog post
  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/blog/posts/${id}`);
  },

  // Get all categories
  getCategories: async (): Promise<BlogCategory[]> => {
    const response = await apiClient.get('/blog/categories');
    return response.data;
  }
};