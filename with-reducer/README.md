# With useReducer

## About this version

In this version, we do exactly the same app as in previous version "with-state"
but with the reducer. We don't manipulate state, we just dispatch actions in the reducers (tasksReducer and filterReducer).

## The definition of a reducer

Just run this in console (you can use npx ts-node):

const arr = [1, 2, 3, 4, 5];

const sum1 = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
console.log(sum1)

function acc_reducer(result: number, number: number) {
  return result + number
}
const sum2 = arr.reduce(acc_reducer)
console.log(sum2)

function increaseByOne(result: number) {
  return result + 1
}

const sum3 = arr.reduce(increaseByOne)
console.log(sum3)
