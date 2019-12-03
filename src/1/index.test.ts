import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution from '.'

describe('Day 1', () => {
  it('calculates the sum of the fuel amount needed for each module', async () => {
    let input: Array<number> = []

    const rl = readline.createInterface({
      input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      input.push(Number(line))
    }

    const result = solution(input)
    expect(result).toBe(3392373)
  })
})
