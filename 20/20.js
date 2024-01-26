const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const k = 800000
  const dp = Array(k).fill(0)
  const fact = part2 ? 11 : 10
  let ans = 0

  for (let i = 1; i < k; i++) {
    const max = part2 ? i * 50 : k

    for (let j = i; j < max; j += i) {
      dp[j] += i * fact

      if (dp[j] >= +input) {
        ans = j
        i = j = k
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
