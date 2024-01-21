const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const tickerTape = {
    children: v => v == 3,
    cats: v => part2 ? v > 7 : v == 7,
    samoyeds: v => v == 2,
    pomeranians: v => part2 ? v < 3 : v == 3,
    akitas: v => v == 0,
    vizslas: v => v == 0,
    goldfish: v => part2 ? v < 5 : v == 5,
    trees: v => part2 ? v > 3 : v == 3,
    cars: v => v == 2,
    perfumes: v => v == 1
  }
  let sues = []
  let ans = 0

  input.forEach((line, i) => {
    const [_, gifts] = line.split(/Sue \d+: /)
    sues[i] = { index: i + 1 }

    gifts.split(', ').forEach(gift => {
      const [name, count] = gift.split(': ')
      sues[i][name] = Number(count)
    })
  })

  for (let key in tickerTape) {
    const compare = tickerTape[key]

    sues = sues.filter(sue => sue[key] == undefined || compare(sue[key]))
  }

  console.log(sues[0].index);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
