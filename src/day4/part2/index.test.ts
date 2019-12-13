import fs from 'fs'
import path from 'path'

import solution, { validateNumber } from '.'

describe('Day 4', () => {
  describe('Part 2', () => {
    test.each([
      [false, 112],
      [false, 111111],
      [false, 223450],
      [false, 123789],
      [true, 112233],
      [true, 122444],
      [false, 123444],
      [true, 111122],
    ])('validates the number according to the rules (expected: %s, input: %s))', (expected, input) => {
      const castedInput = input as number
      const result = validateNumber(castedInput)
      expect(result).toBe(expected)
    })

    test('how many different passwords within the range given in your puzzle input meet the criteria', async () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString()
      const result = solution(input)
      expect(result).toBe(1142)
    })
  })
})
