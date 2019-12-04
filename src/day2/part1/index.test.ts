import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution, { program } from '.'

describe('Day 1', () => {
  describe('Part 1', () => {
    it('example program 1,0,0,0,99', () => {
      const input: Array<number> = [1,0,0,0,99]
      const result = program(input)
      expect(result).toBe(2)
    })

    it('example program 2,3,0,3,99', () => {
      const input: Array<number> = [2,3,0,3,99]
      const result = program(input)
      expect(result).toBe(2)
    })

    it('example program 2,4,4,5,99,0', () => {
      const input: Array<number> = [2,4,4,5,99,0]
      const result = program(input)
      expect(result).toBe(2)
    })

    it('example program 1,1,1,4,99,5,6,0,99', () => {
      const input: Array<number> = [1,1,1,4,99,5,6,0,99]
      const result = program(input)
      expect(result).toBe(30)
    })

    it('calculates the value left at position 0 of the gravity assist program', async () => {
      let input: Array<number> = []

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'fixture.txt')),
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        input = line.split(',').map(Number)
      }

      const result = solution(input)
      expect(result).toBe(3516593)
    })
  })
})
