import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';
import { useAuthStore } from '../useAuthStore'; // Mock the Zustand store
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Use React Query Client

const mock = new MockAdapter(axios);

describe('Refresh Token Flow', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient(); // Create a new QueryClient instance

    // Simulate a valid login state by setting mock tokens
    useAuthStore.setState({
      accessToken: 'validAccessToken',
      refreshToken: 'validRefreshToken',
    });

    // Mock the tasks API response
    mock.onGet('/tasks').reply(200, [
      { id: 1, text: 'Test Task 1', done: false },
      { id: 2, text: 'Test Task 2', done: true },
    ]);

    // Mock the refresh token response
    mock.onPost('/auth_tokens/refresh').reply(200, {
      access_token: 'newAccessToken',
    });
  });

  afterEach(() => {
    mock.reset(); // Reset the mock after each test
    queryClient.clear(); // Clear React Query cache
  });

  it('should refresh token and retry request when access token expires', async () => {
    // Simulate token expiration (first request fails with 401)
    mock.onGet('/tasks').replyOnce(401); // Access token expired on first attempt

    // Render the component inside QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    );

    // Wait for refresh token logic to be triggered and tasks to be fetched
    await waitFor(() => {
      // Ensure that tasks are displayed after refresh token flow
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });

    // Ensure that the refresh token endpoint was called
    expect(mock.history.post.length).toBe(1); // /auth_tokens/refresh should have been called once

    // Ensure that the tasks were fetched after token refresh
    expect(mock.history.get.length).toBe(2); // Initial request + retry after refresh
  });
});
