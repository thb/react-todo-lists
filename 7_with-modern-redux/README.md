# With Redux

## About this version

Here we get rid of redux

`yarn remove redux``

and add redux-toolkit

`yarn add @reduxjs/toolkit`

We will refactor the `tasksReducer` and `filterReducer` into slices using `createSlice`.

So instead of having separate reducer and actions, we have both concepts together in a Slice. Then the slice exports the reducer and the actions.

The store.ts is very similar. We export the store and RootState.

The component don't change at all (except that we import actions from the slices and not from the actions.ts file)
