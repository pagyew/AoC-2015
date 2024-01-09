const { argv } = require('node:process')
const { execSync } = require('node:child_process')
const { writeFileSync, copyFileSync } = require('node:fs')

const day = argv[2]
const cookie = 'session=53616c7465645f5f1270f005cb04451d01dffbe050a263e428b88170204cdc19359d1f3e9310822200df607df6efb7c2912bd4099ddadf4d4e3e6c9957b4e379'

;(async () => {
  const res = await fetch(`https://adventofcode.com/2015/day/${day}/input`, { headers: { cookie } })
  const input = await res.text()

  writeFileSync(`${day}.txt`, input)
  console.log(`${day}.txt written`);

  copyFileSync('template.js', `${day}.js`)
  console.log(`${day}.js copied`);

  execSync(`code ${day}.js`)
  console.log(`${day}.js opened`);
})()
