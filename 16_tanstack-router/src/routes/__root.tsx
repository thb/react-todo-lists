import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import UserLinks from '../components/UserLinks'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})

function RootComponent() {

  return (
    <>
      <div className='flex justify-between'>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>{' '}
          <Link to="/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>{' '}
          <Link
            to="/layout-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Layout
          </Link>{' '}
        </div>
        <div className='flex align-center pr-2'>
          <UserLinks />
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
