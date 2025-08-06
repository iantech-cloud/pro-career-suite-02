// Job Aggregator service for handling job-related operations
import apiClient from '@/lib/apiClient';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  source: string;
  url: string;
  isSaved: boolean;
}

export interface JobSearchFilters {
  query?: string;
  location?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  remote?: boolean;
}

export interface JobAlert {
  id: string;
  title: string;
  filters: JobSearchFilters;
  frequency: 'daily' | 'weekly';
  isActive: boolean;
  createdAt: Date;
}

export class JobService {
  static async searchJobs(filters: JobSearchFilters): Promise<Job[]> {
    const queryParams = new URLSearchParams();
    if (filters.query) queryParams.append('query', filters.query);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.remote) queryParams.append('remote', 'true');
    if (filters.salaryMin) queryParams.append('salaryMin', filters.salaryMin.toString());
    if (filters.salaryMax) queryParams.append('salaryMax', filters.salaryMax.toString());
    
    const response = await apiClient.get(`/jobs/search?${queryParams}`);
    return response.data;
  }

  static async getJob(id: string): Promise<Job> {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  }

  static async getSavedJobs(): Promise<Job[]> {
    const response = await apiClient.get('/jobs/saved');
    return response.data;
  }

  static async saveJob(jobId: string): Promise<void> {
    await apiClient.post('/jobs/save', { jobId });
  }

  static async unsaveJob(jobId: string): Promise<void> {
    await apiClient.delete(`/jobs/saved/${jobId}`);
  }

  static async applyToJob(jobId: string, cvId: string, coverLetter?: string): Promise<void> {
    await apiClient.post('/jobs/apply', { jobId, cvId, coverLetter });
  }

  static async getJobAlerts(): Promise<JobAlert[]> {
    const response = await apiClient.get('/jobs/alerts');
    return response.data;
  }

  static async createJobAlert(alert: Partial<JobAlert>): Promise<JobAlert> {
    const response = await apiClient.post('/jobs/alerts', alert);
    return response.data;
  }

  static async updateJobAlert(id: string, alert: Partial<JobAlert>): Promise<JobAlert> {
    const response = await apiClient.put(`/jobs/alerts/${id}`, alert);
    return response.data;
  }

  static async deleteJobAlert(id: string): Promise<void> {
    await apiClient.delete(`/jobs/alerts/${id}`);
  }
}