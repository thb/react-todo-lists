# README

We add user authentication to the task_api and tasks belong to the user.

We use auth_tokens table with both access_token and refresh_token

We add a user through db:seed, and then add POST /auth_tokens route to login, which creates both access_token and refresh_token. Then, to check up if the user is authenticated (protected routes), we create a before_action method in the application_controller that will control the Bearer token passed to the request for protected routes.

If the access_token in not valid (expired), the user has the possibility to use auh_tokens/refresh to get new tokens and log back in.

