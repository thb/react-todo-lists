The definition og a reducer


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

// you can use ts-node to run these snippets in typescript
// ~ npx ts-node
