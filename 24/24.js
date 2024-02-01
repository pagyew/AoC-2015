const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const groupCount = part2 ? 4 : 3
  const weights = input.map(Number)
  const allWeights = weights.reduce((a, b) => a + b)
  const weightPerGroup = allWeights / groupCount
  const map = {}
  let ans = Infinity

  function dfs(i, sum, memo = {}) {
    const key = [i, sum].join()
    if (memo[key]) return memo[key]
    if (!sum) return [[]]

    const res = []

    for (let j = i; j < n; j++) {
      const w = weights[j]

      if (sum - w >= 0) {
        const res2 = dfs(j + 1, sum - w, memo)
        res.push(...res2.map(x => [w, ...x]))
      }
    }

    memo[key] = res

    return res
  }

  function checkNotSame(g1, g2) {
    let i = 0
    let j = 0

    while (i < g1.length && j < g2.length) {
      if (g1[i] === g2[j]) return false
      else if (g1[i] > g2[j]) j++
      else i++
    }

    return true
  }

  const possibleGroups = dfs(0, weightPerGroup).sort((a, b) => a.length - b.length)
  let minLen = possibleGroups[0].length

  for (let i = 0; i < possibleGroups.length; i++) {
    const g1 = possibleGroups[i]

    if (g1.length > minLen) break

    for (let j = i + 1; j < possibleGroups.length; j++) {
      const g2 = possibleGroups[j]

      if (checkNotSame(g1, g2)) {
        const key1 = g1.reduce((a, b) => a * b)
        const key2 = g2.reduce((a, b) => a * b)

        map[key2] = key1
        minLen = g1.length

        if (!part2 || map[key2]) {
          ans = Math.min(ans, map[key2])
        }

        break
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
