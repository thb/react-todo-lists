# With Redux

## About this version

In this example, we do exactly the same as with Redux + AsyncThunk, but
with RTK Query.

We get rid of tasksSlice and replace it with tasksApi.

We slightly change the store to use the RTK Query API reducer and middleware.

We then have handful methods to dispatch fetch and mutation actions in the components.

The filter selector and its usage stay exacltly the same.
