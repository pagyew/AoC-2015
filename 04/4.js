const { readFileSync } = require('node:fs')
const { basename } = require('node:path')
const { createHash } = require('node:crypto')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  const zeros = part2 ? 6 : 5
  let ans = 0
  let hash

  do {
    hash = createHash('md5')
    hash.update(`${input}${++ans}`)
  } while (parseInt(hash.digest('hex').slice(0, zeros), '16'));

  console.log(ans);
}
