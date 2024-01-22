const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()
const strings = input.split('\n')
const n = strings.length

for (let part2 of [false,true]) {
  let ans = 0

  for (let i = 0; i < n; i++) {
    const s = strings[i]

    const vowels = [...s.matchAll(/[aeiou]/gi)]
    const double = /(\w)\1/gi.test(s)
    const pair = /(ab|cd|pq|xy)/gi.test(s)
    const pairs = /(\w{2}).*\1/gi.test(s)
    const between = /(\w)\w\1/gi.test(s)
    const valid1 = double && !pair && vowels.length >= 3
    const valid2 = between && pairs

    ans += part2 ? valid2 : valid1
  }

  console.log(ans);
}
