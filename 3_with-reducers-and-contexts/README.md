# With useReducer and Context API

## About this version

In this version, we use the same reducers as in the previous version
but we eliminate all the props drilling of functions that dispatch actions.
We can dispatch actions directly from the deep components. We do that by
taking advantage of createContext and useContext to obtain access to the
TaskProvider and FilterProvider in all our app.

