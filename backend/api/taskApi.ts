const API_BASE_URL = 'http://localhost:3000';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

class TaskAPI {
  private baseURL = API_BASE_URL;

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      console.log(`Making request to: ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Response received from ${endpoint}`);
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getAllTasks(): Promise<any[]> {
    const response = await this.makeRequest<ApiResponse<any[]>>('/tasks');
    return response.data ?? [];
  }

  async createTask(taskData: any): Promise<any> {
    const response = await this.makeRequest<ApiResponse<any>>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return response.data ?? response;
  }

  async updateTask(taskId: string, taskData: any): Promise<any> {
    const response = await this.makeRequest<ApiResponse<any>>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return response.data ?? response;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.makeRequest<ApiResponse<void>>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async getAllSubTasks(): Promise<any[]> {
    const response = await this.makeRequest<ApiResponse<any[]>>('/subtasks');
    return response.data ?? [];
  }

  async createSubTask(subtaskData: any): Promise<any> {
    const response = await this.makeRequest<ApiResponse<any>>('/subtasks', {
      method: 'POST',
      body: JSON.stringify(subtaskData),
    });
    return response.data ?? response;
  }

  async updateSubTask(subtaskId: string, subtaskData: any): Promise<any> {
    const response = await this.makeRequest<ApiResponse<any>>(`/subtasks/${subtaskId}`, {
      method: 'PUT',
      body: JSON.stringify(subtaskData),
    });
    return response.data ?? response;
  }

  async deleteSubTask(subtaskId: string): Promise<void> {
    await this.makeRequest<ApiResponse<void>>(`/subtasks/${subtaskId}`, {
      method: 'DELETE',
    });
  }
}

export const taskAPI = new TaskAPI();
export default taskAPI;