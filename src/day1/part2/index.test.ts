import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution from '.'

describe('Day 1', () => {
  describe('Part 2', () => {
    it('example mass 14', () => {
      const result = solution([
        14,
      ])
      expect(result).toBe(2)
    })

    it('example mass 1969', () => {
      const result = solution([
        1969,
      ])
      expect(result).toBe(966)
    })

    it('example mass 100756', () => {
      const result = solution([
        100756,
      ])
      expect(result).toBe(50346)
    })

    it('calculates the sum of the fuel amount needed for each module, taking added fuel into account recursively', async () => {
      let input: Array<number> = []

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        input.push(Number(line))
      }

      const result = solution(input)
      expect(result).toBe(5085699)
    })
  })
})
