const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length
const ops = {
  hlf: x => [x / 2, 1],
  tpl: x => [x * 3, 1],
  inc: x => [x + 1, 1],
  jmp: (x, o) => [x, o],
  jie: (x, o) => x % 2 ? [x, 1] : [x, o],
  jio: (x, o) => x == 1 ? [x, o] : [x, 1]
}

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  let i = 0
  let a = part2 ? 1 : 0
  let b = 0
  let ans = 0

  while (i < n) {
    let [_, off] = input[i].split(', ')
    let [op, x] = _.split(' ')
    let v = x == 'a' ? a : x == 'b' ? b : 0
    off = Number.isFinite(+x) ? +x : off;

    [v, off] = ops[op](v, off)

    i += +off
    x == 'a' ? a = v : x == 'b' ? b = v : 0
  }

  ans = b

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
