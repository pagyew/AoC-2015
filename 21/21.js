const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length
const weapons = [[8,4,0], [10,5,0], [25,6,0], [40,7,0], [74,8,0]]
const armors = [[13,0,1], [31,0,2], [53,0,3], [75,0,4], [102,0,5]]
const rings = [[25,1,0], [50,2,0], [100,3,0], [20,0,1], [40,0,2], [80,0,3]]

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const [bossHits, bossAttack, bossDefense] = [...input.matchAll(/\d+/g)].map(match => +match[0])
  const hits = 100
  let ans = part2 ? 0 : Infinity

  const seen = new Set()

  function dfs(ws, as, rs) {
    const key = JSON.stringify([ws, as, rs])
    if (seen.has(key)) return
    seen.add(key)

    const attack = ws.reduce((a, b) => a + weapons[b][1], 0) + rs.reduce((a, b) => a + rings[b][1], 0)
    const defense = as.reduce((a, b) => a + armors[b][2], 0) + rs.reduce((a, b) => a + rings[b][2], 0)
    const win = Math.ceil(hits / Math.max(1, bossAttack - defense)) >= Math.ceil(bossHits / Math.max(1, attack - bossDefense))

    if (part2 ? !win : win) {
      const cost = ws.reduce((a, b) => a + weapons[b][0], 0)
        + as.reduce((a, b) => a + armors[b][0], 0)
        + rs.reduce((a, b) => a + rings[b][0], 0)

      ans = part2 ? Math.max(ans, cost) : Math.min(ans, cost)

      if (!part2) return
    }

    if (as.length < 1) {
      for (let j = 0; j < armors.length; j++) {
        dfs(ws, as.concat(j), rs)
      }
    }

    if (rs.length < 2) {
      for (let k = (rs[rs.length-1] ?? -1) + 1; k < rings.length; k++) {
        dfs(ws, as, rs.concat(k))
      }
    }
  }

  for (let i = 0; i < weapons.length; i++) {
    dfs([i], [], [], 0, 0, 0)
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
