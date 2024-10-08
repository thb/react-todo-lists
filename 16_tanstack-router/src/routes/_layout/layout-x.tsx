import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/layout-x')({
  component: () => <div>Hello /_layout/layout-x!</div>,
})
