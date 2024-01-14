const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length
const notAllowed = ['i', 'o', 'l'].map(code)

function code(char) {
  return char ? char.charCodeAt(0) : NaN
}

function check(str) {
  let pairs = 0
  let paired = false
  let straights = 0

  for (let i = 0; i < str.length; i++) {
    if (
      str[i+1] - str[i] === 1 &&
      str[i+2] - str[i+1] === 1
    ) straights++

    if (paired) paired = false
    else if (str[i] === str[i+1]) (pairs++, paired = true)

    if (notAllowed.includes(str[i])) return false
  }

  return straights > 0 && pairs > 1
}

let str = input.split('').map(code)

for (let part2 of [false,true]) {
 do {
    for (let i = str.length - 1, j = 1; i >= 0; i--) {
      str[i] += j

      if (str[i] > 122) str[i] = 97
      else break
    }
  } while (!check(str))

  console.log(str.map(s => String.fromCharCode(s)).join(''));
}
