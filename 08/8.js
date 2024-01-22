const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  let ans = 0

  for (let line of input) {
    const original = line
    const decode = eval(line)
    const encode = line
      .replaceAll(/\\/gi, String.raw`\\`)
      .replaceAll(/"/gi, String.raw`\"`)

    ans += part2
      ? encode.length - original.length + 2
      : original.length - decode.length
  }

  console.log(ans);
}
