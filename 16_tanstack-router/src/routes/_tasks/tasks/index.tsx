import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import AddTask from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import FilterBar from '@/components/FilterBar'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/_tasks/tasks/')({
  component: () => <TaskApp />,
})

export default function TaskApp() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  // Check authentication and redirect if necessary
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="max-w-lg mx-auto relative">
      <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
      <FilterBar />
      <AddTask />
      <TaskList />
    </div>
  )
}
