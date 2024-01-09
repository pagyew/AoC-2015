const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(`${day}.txt`, 'utf8').trim()

const boxes = input.split('\n')
const n = boxes.length

for (let part2 of [false,true]) {
  let ans = 0

  for (let i = 0; i < n; i++) {
    const [l, w, h] = boxes[i].split('x').map(Number).sort((a, b) => a - b)

    if (part2) {
      ans += 2*l + 2*w + l*w*h
    } else {
      ans += 2*l*w + 2*w*h + 2*h*l + l*w
    }
  }

  console.log(ans);
}
