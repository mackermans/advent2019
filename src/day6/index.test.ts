import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution1 from './part1'
import solution2 from './part2'

describe('Day 6', () => {
  describe('Part 1', () => {
    test('example', () => {
      const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'] as RawInput

      const result = solution1(input)
      expect(result).toBe(42)
    })

    test('total number of direct and indirect orbits', async () => {
      const input = [] as RawInput

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'input.txt')),
        crlfDelay: Infinity,
      })

      for await (const line of rl) {
        input.push(line)
      }

      const result = solution1(input)
      expect(result).toBe(186597)
    })
  })

  describe('Part 2', () => {
    test('example', () => {
      const input = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN',
      ] as RawInput

      const result = solution2(input)
      expect(result).toBe(4)
    })

    test('the minimum number of orbital transfers required', async () => {
      const input = [] as RawInput

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'input.txt')),
        crlfDelay: Infinity,
      })

      for await (const line of rl) {
        input.push(line)
      }

      const result = solution2(input)
      expect(result).toBe(412)
    })
  })
})
