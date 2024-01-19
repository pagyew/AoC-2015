const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const time = 2503
  const reindeers = input.map(line => [...line.match(/\d+/g).map(Number), 0, 0])
  let ans = 0

  for (let i = 0; i < time; i++) {
    let max = 0
    let maxes = []

    for (let j = 0; j < n; j++) {
      const [s, t, r, td] = reindeers[j]
      const d = i % (r + t) < t ? s : 0

      reindeers[j][3] = td + d

      if (td + d > max) {
        max = td + d
        maxes = [j]
      } else if (td + d === max) {
        maxes.push(j)
      }
    }

    maxes.forEach(j => reindeers[j][4]++)
  }

  reindeers.forEach(([s, t, r, td, p]) => {
    ans = Math.max(ans, part2 ? p : td)
  })

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
