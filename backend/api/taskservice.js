const API_BASE_URL = 'http://10.84.89.1:3000';

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
            console.log('Request config:', config);
            
            const response = await fetch(url, config);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Response from ${endpoint}:`, data);
            return data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            console.error('Error details:', error.message, error.stack);
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
        // Only send the fields that the backend expects
        const cleanTaskData = {
            title: taskData.title,
            description: taskData.description,
            due_date: taskData.due_date,
            time: taskData.time,
            is_completed: taskData.is_completed
        };
        
        console.log('Sending task update data:', cleanTaskData);
        
        return this.makeRequest(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(cleanTaskData),
        });
    }

    async updateSubTask(subTaskId, subTaskData) {
        // Only send the fields that the backend expects
        const cleanSubTaskData = {
            title: subTaskData.title,
            description: subTaskData.description,
            due_date: subTaskData.due_date,
            time: subTaskData.time,
            is_completed: subTaskData.is_completed
        };
        
        console.log('Sending subtask update data:', cleanSubTaskData);
        
        return this.makeRequest(`/subtasks/${subTaskId}`, {
            method: 'PUT',
            body: JSON.stringify(cleanSubTaskData),
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