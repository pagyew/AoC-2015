const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  const map = {}
  let ans = part2 ? 0 : Infinity

  for (let line of input) {
    const [from, _, to, __, d] = line.split(' ')

    map[from] ||= {}
    map[to] ||= {}
    map[from][to] = +d
    map[to][from] = +d
  }

  for (let from in map) {
    const seen = new Set()
    const q = [[from, 0, seen]]

    while (q.length) {
      const [u, d, s] = q.shift()

      s.add(u)

      if (s.size === Object.keys(map).length) {
        ans = part2 ? Math.max(ans, d) : Math.min(ans, d)
        continue
      }

      for (let to in map[u]) {
        if (!s.has(to)) {
          q.push([to, d + map[u][to], new Set(s)])
        }
      }
    }
  }

  console.log(ans);
}
