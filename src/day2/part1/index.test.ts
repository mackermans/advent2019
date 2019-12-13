import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution, { program } from '.'

describe('Day 2', () => {
  describe('Part 1', () => {
    test.each([
      [[2], [1, 0, 0, 0, 99]],
      [[2], [2, 3, 0, 3, 99]],
      [[2], [2, 4, 4, 5, 99, 0]],
      [[30], [1, 1, 1, 4, 99, 5, 6, 0, 99]],
    ])('example program (expected: %s, input: %s))', (expected, input) => {
      const result = program(input)
      expect(result).toBe(expected[0])
    })

    it('calculates the value left at position 0 of the gravity assist program', async () => {
      let input: Array<number> = []

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
        crlfDelay: Infinity,
      })

      for await (const line of rl) {
        input = line.split(',').map(Number)
      }

      const result = solution(input)
      expect(result).toBe(3516593)
    })
  })
})
