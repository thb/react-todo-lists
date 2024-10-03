# With Redux

## About this version

This version use the "Tan" stack :
- TanStack Router
- TanStack Query
- Zustand

### API (ruby) remains unchanged

- User table with email and hased password
- AuthToken table with access_token and refresh_token and their expiration dates
- Task belong to the user
- 3 routes on the api implemented in the `AuthTokensController`
  - `POST auth_tokens` for login with credentials (email, password)
  - `POST auth_tokens/refresh` for login with `refresh_token` 
  - `DELETE auth_tokens` for logout

### React

We use a Zustand store for auth state and actions.

We build a apiClient to wrap an axois instance with interceptors that :
- add the `Bearer access_token` header.
- capability to refresh the tokens and retry if `access_token` is expired.

And that's it !
