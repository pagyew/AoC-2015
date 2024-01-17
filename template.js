const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  let ans = 0


  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
