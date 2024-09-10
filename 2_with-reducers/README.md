# With useReducer

## About this version

In this version, we do exactly the same app as in previous version "with-state"
but with the reducer. We don't manipulate state, we just dispatch actions in the reducers (tasksReducer and filterReducer).

## The definition of a reducer

A reducer is a function that transforms an array into a single value doing an operation on each item.

Example : a function that sums up the items of an array.

```
const arr = [1, 2, 3, 4, 5];

const sum1 = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5

console.log(sum1)
```

Now if we define elsewhere the function that we pass to reduce :

```
function acc_reducer(result: number, number: number) {
  return result + number
}

const sum2 = arr.reduce(acc_reducer)

console.log(sum2)
```

Now, let's write another function ìncreaseByOne

```
function increaseByOne(result: number) {
  return result + 1
}

const sum3 = arr.reduce(increaseByOne)

console.log(sum3)
```
