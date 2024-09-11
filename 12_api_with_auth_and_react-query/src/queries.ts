import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks, updateTask } from "./api";
import { Task } from "./types";
import { queryClient } from "./queryClient";


export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })
}

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (newTask: Omit<Task, 'id'>) => createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  })
}

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  })
}

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
