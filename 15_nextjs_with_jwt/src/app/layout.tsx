import { getSession } from '@/lib/session';
import './globals.css';
import { logout } from '@/actions/authActions';

export const metadata = {
  title: 'Todo App',
  description: 'A simple Todo app with Next.js App Router',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await getSession() as any;

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav className="flex justify-between">
            <ul className="flex gap-4">
              <li><a href="/">Home</a></li>
              <li><a href="/tasks">Tasks</a></li>
            </ul>
            <ul className="flex gap-4">
              {session && <>
                <li>{session.user.email}</li>
                <li>
                  <form action={logout}>
                    <button type="submit">Logout</button>
                  </form>
                </li>
              </>}
              {!session && <>
                <li><a href="/login">Login</a></li>
                <li> <a href="/register">Register</a></li>
              </>}
            </ul>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-lg">
          {children}
        </main>
        <footer className="text-gray-300 row-start-3 flex gap-6 flex-wrap items-center justify-center">
          This is the layout footer
        </footer>
      </body>
    </html>
  );
}
