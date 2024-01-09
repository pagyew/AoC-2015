const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8')

const n = input.length

for (let part2 of [false,true]) {
  let ans = 0

  for (let i = 0; i < n; i++) {
    ans += input[i] === '(' ? 1 : -1

    if (part2 && ans === -1) {
      ans = i + 1
      break
    }
  }

  console.log(ans);
}
