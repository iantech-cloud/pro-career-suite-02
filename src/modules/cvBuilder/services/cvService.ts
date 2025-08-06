import apiClient from '@/lib/apiClient';

export interface CvData {
  id: string;
  title: string;
  template: string;
  content: Record<string, any>;
  lastModified: Date;
  createdAt: Date;
  userId: string;
}

export class CvService {
  static async getCvs(): Promise<CvData[]> {
    const response = await apiClient.get('/cvs');
    return response.data;
  }

  static async getCv(id: string): Promise<CvData> {
    const response = await apiClient.get(`/cvs/${id}`);
    return response.data;
  }

  static async createCv(cvData: Partial<CvData>): Promise<CvData> {
    const response = await apiClient.post('/cvs', cvData);
    return response.data;
  }

  static async updateCv(id: string, cvData: Partial<CvData>): Promise<CvData> {
    const response = await apiClient.put(`/cvs/${id}`, cvData);
    return response.data;
  }

  static async deleteCv(id: string): Promise<void> {
    await apiClient.delete(`/cvs/${id}`);
  }

  static async enhanceWithAi(text: string): Promise<string> {
    const response = await apiClient.post('/ai/enhance', { text });
    return response.data.enhancedText;
  }
}