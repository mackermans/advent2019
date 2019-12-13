import solution, { validateNumber } from '.'

describe('Day 3', () => {
  describe('Part 1', () => {
    test.each([
      [false, 111],
      [true, 111111],
      [false, 223450],
      [false, 123789],
    ])('validates the number according to the rules (expected: %s, input: %s))', (expected, input) => {
      const castedInput = input as number
      const result = validateNumber(castedInput)
      expect(result).toBe(expected)
    })

    test('how many different passwords within the range given in your puzzle input meet the criteria', async () => {
      const input = '172930-683082'
      const result = solution(input)
      expect(result).toBe(1675)
    })
  })
})
