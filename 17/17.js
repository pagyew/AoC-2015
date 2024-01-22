const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const containers = input.map(Number)
  const sum = 150
  const hash = []
  let ans = 0

  function dfs(sum, j, k) {
    if (!sum) hash[k] = (hash[k] ?? 0) + 1
    else for (let i = j; i < n; i++) dfs(sum - containers[i], i + 1, k + 1)
  }

  dfs(sum, 0, 0)

  ans = part2
    ? hash.find(Boolean)
    : hash.reduce((a, b) => a + b)

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
