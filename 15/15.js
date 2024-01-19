const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const ingredients = input.map(line => [...line.match(/-*\d+/g).map(Number)])
  let ans = 0

  for (let n1 = 0; n1 <= 100; n1++) {
    const i1 = ingredients[0]

    for (let n2 = 0; n2 <= 100 - n1; n2++) {
      const i2 = ingredients[1]

      for (let n3 = 0; n3 <= 100 - n2; n3++) {
        const n4 = 100 - n1 - n2 - n3
        const i3 = ingredients[2]
        const i4 = ingredients[3]
        let score = 1

        for (let i = 0; i < 4; i++) {
          score *= Math.max(n1*i1[i] + n2*i2[i] + n3*i3[i] + n4*i4[i], 0)
        }

        if (!part2 || n1*i1[4] + n2*i2[4] + n3*i3[4] + n4*i4[4] == 500) ans = Math.max(ans, score)
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
