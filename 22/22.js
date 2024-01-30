const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length
const spells = [
  [53, 4, 0, 0, 0, 0],
  [73, 2, 2, 0, 0, 0],
  [113, 0, 0, 7, 0, 6],
  [173, 3, 0, 0, 0, 6],
  [229, 0, 0, 0, 101, 5]
]

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const [bossHits, bossAttack] = [...input.matchAll(/\d+/g)].map(match => +match[0])
  const hits = 50
  const mana = 500
  const seen = new Set()
  let ans = Infinity

  function dfs(h, b, effects, mana, spend, turn) {
    const key = [h, b, effects, mana, spend, turn].join()
    if (seen.has(key)) return
    seen.add(key)

    if (turn && part2) h--
    if (h <= 0) return

    let armor = 0
    let damage = 0
    let e = effects.length

    while (e--) {
      const [idx, dd, dh, da, dm, timer] = effects.shift()

      damage += dd
      h += dh
      armor += da
      mana += dm

      if (timer > 1) effects.push([idx, dd, dh, da, dm, timer - 1])
    }

    b -= damage

    if (b <= 0) {
      ans = Math.min(ans, spend)
    } else if (turn) {
      for (let i = 0; i < spells.length; i++) {
        if (effects.some(e => e[0] == i)) continue
        if (mana < spells[i][0]) continue

        const [cost, dd, dh, da, dm, timer] = spells[i]
        const newEffects = structuredClone(effects)

        if (timer) {
          newEffects.push([i, dd, dh, da, dm, timer])

          dfs(h, b, newEffects, mana - cost, spend + cost, !turn)
        } else {
          dfs(h + dh, b - dd, newEffects, mana - cost, spend + cost, !turn)
        }
      }
    } else {
      dfs(h - bossAttack + armor, b, structuredClone(effects), mana, spend, !turn)
    }
  }

  dfs(hits, bossHits, [], mana, 0, true)

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
