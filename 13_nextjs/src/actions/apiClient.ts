// API URL for the Rails backend
const API_URL = 'http://localhost:3001';

// Helper function to create the API client for server actions
export async function apiClient(endpoint: string, method = 'GET', data?: any) {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}


const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

export { GET, POST, PUT, DELETE }