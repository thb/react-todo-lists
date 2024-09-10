# With Redux

## About this version

This version is the same but with hooks. (hooks were introduced in 2019)
Now we use redux exactly the same way as before but use hooks `useSelector` and `useDispatch` instead of `connect(mapStateToProps, mapDispatchToProps)(TaskItem);`
It lets us access the state and dispatch actions directly from inside our components without props and inelegant connect approach.

CAUTION : for performance purpose (also true for previous versions), it is better
to call one useSelector and useDispatch in the parent component than in every child component. Otherwise, the component will re-render on every state change.
