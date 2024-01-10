const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8').trim()
const regex = /(.+?) (\d{1,3},\d{1,3}).+?(\d{1,3},\d{1,3})/gi
const instructions = input
  .split('\n')
  .map(s => [...s.matchAll(regex)][0].slice(1))
  .map(([a, s, e]) => [
    ({ toggle: -1, 'turn off': 0, 'turn on': 1 })[a],
    s.split(',').map(Number),
    e.split(',').map(Number)
  ])
const n = instructions.length
const m = 1000

for (let part2 of [false,true]) {
  const grid = Array(m).fill().map(() => Array(m).fill(0))
  let ans = 0

  for (let i = 0; i < n; i++) {
    const [act, [sy, sx], [ey, ex]] = instructions[i]

    for (let y = sy; y <= ey; y++) {
      for (let x = sx; x <= ex; x++) {
        grid[y][x] = part2
          ? grid[y][x] + (act == -1 ? 2 : act ? 1 : -1)
          : act == -1 ? +!grid[y][x] : act ? 1 : 0

        grid[y][x] = Math.max(grid[y][x], 0)
      }
    }
  }

  for (let y = 0; y < m; y++) {
    for (let x = 0; x < m; x++) {
      ans += grid[y][x]
    }
  }

  console.log(ans);
}
