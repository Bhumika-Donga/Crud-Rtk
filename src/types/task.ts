export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

export interface ApiResponse<T> {
  statusMessage: string;
  statusCode: number;
  response: T;
}

export interface TasksResponse {
  tasks: Task[];
}

export interface TaskResponse {
  task: Task;
} 