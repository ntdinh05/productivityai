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
            }
            console.log(`Making request to ${url} with options:`, config);
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
    async getAllTasks(endpoint) {
        return this.makeRequest(endpoint);
    }
    async createTask(taskData, endpoint) {
        return this.makeRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }
    async updateTask(taskId, taskData, endpoint) {
        return this.makeRequest(`${endpoint}/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        });
    }
    async deleteTask(taskId, endpoint) {
        return this.makeRequest(`${endpoint}/${taskId}`, {
            method: 'DELETE',
        });
    }
}

export default new TaskAPI();