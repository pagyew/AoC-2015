const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  const dirs = { '>': [0,1], 'v': [1,0], '<': [0,-1], '^': [-1,0] }
  const set = new Set([0])
  const yx = [[0,0], [0,0]]
  const m = part2 ? 2 : 1
  let ans = 1

  for (let i = 0; i < n; i+=m) {
    for (let j = 0; j < m; j++) {
      const [dy, dx] = dirs[input[i+j]]
      yx[j][0] += dy
      yx[j][1] += dx

      const key = yx[j][0] * n + yx[j][1]

      if (!set.has(key)) {
        set.add(key)
        ans++
      }
    }
  }

  console.log(ans);
}
