// Social Publisher service for handling social media operations
import apiClient from '@/lib/apiClient';

export interface SocialPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: Date;
  publishedAt?: Date;
}

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  isConnected: boolean;
  connectedAt: Date;
}

export interface PostAnalytics {
  postId: string;
  platform: string;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  engagement: number;
}

export class SocialService {
  static async getPosts(): Promise<SocialPost[]> {
    const response = await apiClient.get('/social/posts');
    return response.data;
  }

  static async createPost(data: Partial<SocialPost>): Promise<SocialPost> {
    const response = await apiClient.post('/social/posts', data);
    return response.data;
  }

  static async updatePost(id: string, data: Partial<SocialPost>): Promise<SocialPost> {
    const response = await apiClient.put(`/social/posts/${id}`, data);
    return response.data;
  }

  static async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/social/posts/${id}`);
  }

  static async getConnectedAccounts(): Promise<SocialAccount[]> {
    const response = await apiClient.get('/social/accounts');
    return response.data;
  }

  static async connectAccount(platform: string): Promise<SocialAccount> {
    const response = await apiClient.post('/social/accounts/connect', { platform });
    return response.data;
  }

  static async disconnectAccount(accountId: string): Promise<void> {
    await apiClient.delete(`/social/accounts/${accountId}`);
  }

  static async getPostAnalytics(postId: string): Promise<PostAnalytics[]> {
    const response = await apiClient.get(`/social/posts/${postId}/analytics`);
    return response.data;
  }
}