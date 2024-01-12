const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false,true]) {
  const number = part2 ? 50 : 40
  let str = input

  for (let i = 0; i < number; i++) {
    const n = str.length
    const res = []

    for (let j = 1, c = 1; j <= n; j++) {
      if (str[j] === str[j-1]) {
        c++
      } else {
        res.push(c, str[j-1])
        c = 1
      }
    }

    str = res.join('')
  }

  console.log(str.length);
}
