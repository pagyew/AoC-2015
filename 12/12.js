const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  const doc = JSON.parse(input)
  let ans = 0

  function dfs(obj) {
    if (typeof obj === 'number') ans += obj
    else if (Array.isArray(obj)) {
      obj.forEach(dfs)
    } else if (typeof obj === 'object') {
      const values = Object.values(obj)

      if (!(part2 && values.includes('red'))) values.forEach(dfs)
    }
  }

  dfs(doc)

  console.log(ans);
}
