# A standard Nextjs version

This version is a NextJS version, with all the same features as the previous version.

It uses the routing capabilities of NextJS so the todo list is available at
`/tasks` URL.

It is not a "fullstack" example, it still relies on the same `task_api` (no auth for this version). Most nextjs apps these days directly dig into the database from the server actions with an ORM like Prisma or Dizzle. I personnally prefer to use a Rails backend because it is more testable (important for business logic in complex apps) and it has a good integration of external services (message queues, search, geographical data, etc).

It uses actions for HTTP requests to the API (with the `apiClient` function)

NB : the filter state is taken from the URL search params. We could ask the API to filter itself the tasks by passing a filter in the URL.

We could also to many things like

- client validation with Zod
- sevrver validation in actions with Zod too
- handle API errors

In a real project, we would probably need 2 of them.