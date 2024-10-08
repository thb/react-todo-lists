import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_tasks')({
  component: TaskLayoutComponent,
})

function TaskLayoutComponent() {
  return (
    <>
      <h3>Hey, this is a Task Layout</h3>
      <Outlet />
    </>
  )
}
