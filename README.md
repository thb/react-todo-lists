# Todo List experiments

This is a set of different versions of the very same todo list application in React to experiment with different React architectures and technologies.

![image](https://github.com/user-attachments/assets/250b5c8a-558a-4082-a795-6f8dfa259aab)

## Why

There are many ways to create React applications nowadays, and it is useful to have a look at different versions of the same app using different hooks, frameworks, libs, etc.

These version are either :
- static (client only)
- API (connected to an API)
- API + auth (connected to an API and with authentication)

(API) versions are using the API located in `task_api`folter.
(API + auth) verssions are using the API located in `task_api_with_auth`folter.

## Versions

done :

01. with useState
02. with useReducer
03. with useReducer and Context
04. with old school redux (connect state to props and dispatch to props)
05. with redux hooks (useDispatch and useSelector)
06. with redux and more hooks (useMemo, useEffect, useCallback)
07. with modern redux (slices)
08. with zustand
09. (API) with modern redux and async thunks
10. (API) with rtk-query
11. (API) with react-query
12. (API + auth) with react-query and zustand
13. (API) with NextJS
14. (API + auth) with NextJS and auth tokens
15. (API + auth) with NextJS and JWT
16. with tanstack router

doing:

todo:

- with old school redux + thunk (manual thunks)
- with NextJS + AuthJS

## About the API

`task_api`and `task_api_with_auth` are developped in Ruby on Rails in 5 minutes for the first one and add 10 minutes for the second one.

They provide a simple CRUD interface for tasks :

```
GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
```

The version with autentication provide a kind of oauth authentication with an access token and a refresh token. The routes are :

```
POST /auth_tokens           # login with email and password
POST /auth_tokens/refresh   # refresh the access token
DELETE /auth_tokens         # logout
```

The strategy for the client app is to have an apiClient with 2 interceptors to manage the access token and refresh token.

- adds a Bearer token to the Authorization header

- if the request is rejected and we have a refresh token, we try to refresh the access token and retry the request
