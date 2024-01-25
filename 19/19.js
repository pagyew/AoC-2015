const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const [replacements, molecule] = input.split('\n\n')
  const map = replacements.split('\n')
    .reduce((acc, line) => acc.concat([line.split(' => ')]), [])
    .sort((a, b) => b[1].length - a[1].length)
  const ways = new Set()
  let curr = molecule
  let ans = 0

  if (part2) {
    while (curr != 'e') {
      ans++

      for (let i = 0; i < map.length; i++) {
        if (curr.indexOf(map[i][1]) != -1) {
          curr = curr.replace(map[i][1], map[i][0])
          break
        }
      }
    }
  } else {
    for (let i = 0; i < map.length; i++) {
      const [from, to] = map[i]
      let idx = molecule.indexOf(from)

      while (idx !== -1) {
        const way = molecule.replaceAll(from, (_, offset) => offset == idx ? to : from)

        if (!ways.has(way)) ans++
        ways.add(way)

        idx = molecule.indexOf(from, idx + 1)
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
