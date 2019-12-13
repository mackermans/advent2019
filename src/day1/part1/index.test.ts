import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution from '.'

describe('Day 1', () => {
  describe('Part 1', () => {
    it('example mass 12', () => {
      const result = solution([12])
      expect(result).toBe(2)
    })

    it('example mass 14', () => {
      const result = solution([14])
      expect(result).toBe(2)
    })

    it('example mass 1969', () => {
      const result = solution([1969])
      expect(result).toBe(654)
    })

    it('example mass 100756', () => {
      const result = solution([100756])
      expect(result).toBe(33583)
    })

    it('calculates the sum of the fuel amount needed for each module', async () => {
      const input: Array<number> = []

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
        crlfDelay: Infinity,
      })

      for await (const line of rl) {
        input.push(Number(line))
      }

      const result = solution(input)
      expect(result).toBe(3392373)
    })
  })
})
