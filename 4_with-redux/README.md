# With Redux

## About this version

In this version, we convert this app into a Redux-based application (using the "old-school" way with action creators and reducers without Redux Toolkit), we follow these steps:

1. Set up Redux Store: Create the reducers and action creators.

2. Connect Components to Redux: Use connect from react-redux to connect components to the Redux store.

3. Replace Context and useReducer: All state management (tasks and filters) will be handled by Redux, and connect will be used to map state and dispatch to props.