
import { logout, refreshSession } from '@/actions/authActions';

export default async function RefreshSessionPage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">You are connected, but we need to confirm your identity.</h1>
      <p className="mb-8">Please confirm to refresh your session or logout.</p>

      {/* Refresh token form */}
      <form id="refresh-form" action={refreshSession} method="POST">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Refresh Session
        </button>
      </form>

      {/* Logout button */}
      <form id="logout-form" action={logout} method="POST">
        <button type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
