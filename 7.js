const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8').trim().split('\n')

const n = input.length
const operations = {
  'AND': '&',
  'OR': '|',
  'NOT': '~',
  'LSHIFT': '<<',
  'RSHIFT': '>>'
}
const circuit = new Map()
input.forEach(line => {
  const [l, r] = line.split(' -> ')
  const [a, b, c] = l.split(' ')

  circuit.set(r, [a, b, c])
})

for (let part2 of [false,true]) {
  const cache = new Map()
  let ans = 0

  function dfs (v) {
    if (!circuit.has(v)) return +v
    if (cache.has(v)) return cache.get(v)

    const [a, b, c] = circuit.get(v)

    cache.set(v, c
      ? eval(`${dfs(a)}${operations[b]}${dfs(c)}`)
      : b
        ? eval(`${operations[a]}${dfs(b)}`)
        : dfs(a)
    )

    return cache.get(v)
  }

  ans = dfs('a')
  console.log(ans);

  if (!part2) circuit.set('b', [ans])
}
