import fs from 'fs'
import path from 'path'
import readline from 'readline'

import solution from '.'

describe('Day 3', () => {
  describe('Part 2', () => {
    test.each([
      [
        30,
        [
          'R8,U5,L5,D3',
          'U7,R6,D4,L4'
        ],
      ],
      [
        610,
        [
          'R75,D30,R83,U83,L12,D49,R71,U7,L72',
          'U62,R66,U55,R34,D71,R55,D58,R83'
        ],
      ],
      [
        410,
        [
          'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
          'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
        ],
      ]
    ])('examples (expected: %s, input: %s))', (expected, input) => {
      const castedInput = input as Array<string>
      const result = solution(castedInput)
      expect(result).toBe(expected)
    })

    it('calculates the fewest combined steps the wires must take to reach an intersection', async () => {
      const input: Array<string> = []

      const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'input.txt')),
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        input.push(line)
      }

      const result = solution(input)
      expect(result).toBe(14746)
    })
  })
})
