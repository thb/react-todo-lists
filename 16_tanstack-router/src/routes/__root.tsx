import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import UserLinks from '../components/UserLinks'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='flex justify-between'>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>
        </div>
        <div className='flex align-center pr-2'>
          <UserLinks />
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})