const { argv } = require('node:process')
const { execSync } = require('node:child_process')
const { writeFileSync, copyFileSync, mkdirSync } = require('node:fs')

const day = argv[2]
const cookie = 'session=53616c7465645f5f96251f8097e97db0d54aeefa84c9a077171688b26f6aee136ecc36f3750ddfa606fb94e3f4002a8709c98167bebd837664b4882ac8308e17'

;(async () => {
  const res = await fetch(`https://adventofcode.com/2015/day/${day}/input`, { headers: { cookie } })
  const input = await res.text()
  const pday = day.padStart(2, 0)

  mkdirSync(pday)

  writeFileSync(`${pday}/${day}.txt`, input)
  console.log(`${day}.txt written`);

  copyFileSync('template.js', `${pday}/${day}.js`)
  console.log(`${day}.js copied`);

  execSync(`code ${pday}/${day}.js`)
  console.log(`${day}.js opened`);
})()
