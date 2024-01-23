const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')
const n = input.length
const m = input[0].length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  let grid = input.map(line => line.split('').map(c => +(c === '#')))
  let map = Array(n).fill().map(() => Array(m).fill(0))
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1,-1], [1,-1], [-1, 1], [1, 1]]
  let ans = 0

  for (let k = 0; k < 100; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let c = 0

        for (let [dy, dx] of dirs) {
          const y = i + dy
          const x = j + dx
          c += 0 <= y && y < n && 0 <= x && x < m && grid[y][x]
        }

        map[i][j] = +(c == 3 || (c == 2 && grid[i][j]))
      }
    }

    if (part2) {
      map[0][0] = map[0][m-1] = map[n-1][0] = map[n-1][m-1] = 1
    }

    grid = map
    map = Array(n).fill().map(() => Array(m).fill(0))
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      ans += grid[i][j]
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
