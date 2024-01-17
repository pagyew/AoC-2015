const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const regex = /^(\w+).*(gain|lose).*?(\d+).*?(\w+)\.$/gi
  const map = {}
  let ans = -Infinity

  input.forEach(line => {
    const [_, f, s, v, t] = [...line.matchAll(regex)][0]
    const val = Number({'gain':'','lose':'-'}[s] + v)

    map[f] ||= {}
    map[t] ||= {}
    map[f][t] ||= 0
    map[t][f] ||= 0
    map[f][t] += val
    map[t][f] += val
  })

  if (part2) {
    for (let f in map) {
      map[f]['me'] = 0
      map['me'] ||= {}
      map['me'][f] = 0
    }
  }

  const seen = new Set()
  const q = [['Alice', 0, seen]]

  while (q.length) {
    const [u, d, s] = q.shift()

    s.add(u)

    if (s.size === Object.keys(map).length) {
      if (u !== 'Alice') s.delete('Alice')
      else ans = Math.max(ans, d)
    }

    for (let to in map[u]) {
      if (!s.has(to)) {
        q.push([to, d + map[u][to], new Set(s)])
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
