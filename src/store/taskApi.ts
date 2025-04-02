import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task, TaskFormData, ApiResponse, TasksResponse, TaskResponse } from '../types/task';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8001/api/v1/users',
    // Add headers if required by your API
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      query: () => '/allTasks',
      transformResponse: (response: ApiResponse<TasksResponse>) => {
        if (!response || !response.response || !response.response.tasks) {
          throw new Error('Tasks not found');
        }
        return response.response.tasks;
      },
      providesTags: ['Tasks'],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      transformResponse: (response: ApiResponse<TaskResponse>) => {
        if (!response || !response.response || !response.response.task) {
          throw new Error('Task not found');
        }
        return response.response.task;
      },
      providesTags: (_result, _error, id) => [{ type: 'Tasks', id }],
    }),
    createTask: builder.mutation<Task, TaskFormData>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      transformResponse: (response: ApiResponse<TaskResponse>) => {
        if (!response || !response.response || !response.response.task) {
          throw new Error('Error while creating task');
        }
        return response.response.task;
      },
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, { id: string; task: TaskFormData }>({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
      transformResponse: (response: ApiResponse<TaskResponse>) => {
        if (!response || !response.response || !response.response.task) {
          throw new Error('Error while updating task');
        }
        return response.response.task;
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Tasks', id }, 'Tasks'],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Tasks', id }, 'Tasks'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi; 