import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tasks/test')({
  component: () => <div>Hello /_tasks/test!</div>,
})
