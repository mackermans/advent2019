import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution, { program } from '.'

const loadInput = async () => {
  let input: Array<number> = []

  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    input = line.split(',').map(Number)
  }
  return input
}

describe('Day 2', () => {
  describe('Part 1', () => {
    it('example input noun=12 and verb=2 for result 1202', async () => {
      const input = await loadInput()
      const expectedOutput = program(input, 12, 2)
      const result = solution(input, expectedOutput)
      expect(result).toBe(1202)
    })

    it('calculates the value left at position 0 of the gravity assist program', async () => {
      const input = await loadInput()
      const expectedOutput = 19690720
      const result = solution(input, expectedOutput)
      expect(result).toBe(7749)
    })
  })
})
