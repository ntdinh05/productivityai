const API_BASE_URL = 'http://localhost:3000';

class TaskAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async makeRequest(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            };
            console.log(`Making request to ${url}`);
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Response from ${endpoint}:`, data);
            return data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    // Get all tasks
    async getAllTasks() {
        return this.makeRequest('/tasks');
    }

    // Get all subtasks - Add this method
    async getAllSubTasks() {
        return this.makeRequest('/subtasks');
    }

    // Create task
    async createTask(taskData) {
        return this.makeRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }

    async createSubTask(subTaskData) {
        return this.makeRequest('/subtasks', {
            method: 'POST',
            body: JSON.stringify(subTaskData),
        });
    }

    // Update task
    async updateTask(taskId, taskData) {
        return this.makeRequest(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        });
    }

    async updateSubTask(subTaskId, subTaskData) {
        return this.makeRequest(`/subtasks/${subTaskId}`, {
            method: 'PUT',
            body: JSON.stringify(subTaskData),
        });
    }

    // Delete task
    async deleteTask(taskId) {
        return this.makeRequest(`/tasks/${taskId}`, {
            method: 'DELETE',
        });
    }
    
    async deleteSubTask(subTaskId) {
        return this.makeRequest(`/subtasks/${subTaskId}`, {
            method: 'DELETE',
        });
    }
}

export default new TaskAPI();