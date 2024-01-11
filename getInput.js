const { argv } = require('node:process')
const { execSync } = require('node:child_process')
const { writeFileSync, copyFileSync, mkdirSync, existsSync } = require('node:fs')

const day = argv[2]
const cookie = 'session=53616c7465645f5f96251f8097e97db0d54aeefa84c9a077171688b26f6aee136ecc36f3750ddfa606fb94e3f4002a8709c98167bebd837664b4882ac8308e17'

;(async () => {
  const res = await fetch(`https://adventofcode.com/2015/day/${day}/input`, { headers: { cookie } })
  const input = await res.text()
  const pday = day.padStart(2, 0)
  const inputFile = `${pday}/${day}.txt`
  const scriptFile = `${pday}/${day}.js`

  if (existsSync(pday)) {
    console.log(`${pday} folder already exists`);
  } else {
    mkdirSync(pday)
    console.log(`${pday} folder created`);
  }

  if (existsSync(inputFile)) {
    console.log(`${day}.txt already written`);
  } else {
    writeFileSync(inputFile, input)
    console.log(`${day}.txt written`);
  }

  if (existsSync(scriptFile)) {
    console.log(`${day}.js already copied`);
  } else {
    copyFileSync('template.js', scriptFile)
    console.log(`${day}.js copied`);
  }

  execSync(`code ${scriptFile}`)
  console.log(`${scriptFile} opened`);
})()
