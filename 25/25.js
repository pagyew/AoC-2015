const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const [row, col] = [...input.matchAll(/\d+/g)].map(match => Number(match[0]))
  const start = 20151125
  const generate = x => (x * 252533) % 33554393
  const sumOfRange = (a, b) => (a + b) * (b - a + 1) / 2
  let ops = sumOfRange(1, row - 1) + sumOfRange(row + 1, row + 1 + col - 2)
  let ans = start

  while (ops--) ans = generate(ans)

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
