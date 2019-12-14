import fs from 'fs'
import path from 'path'

import solution1, { operations } from './part1'

const MODE_FIRST_IMMEDIATE = {
  first: 1,
  second: 0,
  third: 0,
}
const MODE_SECOND_IMMEDIATE = {
  first: 0,
  second: 1,
  third: 0,
}
const INITIAL_ADDRESS = 0

describe('Day 4', () => {
  describe('Part 1', () => {
    test.each([
      ['add (first)', operations.add, MODE_FIRST_IMMEDIATE, '1,4,5,6,10,20,0', '1,4,5,6,10,20,24', 24],
      ['add (second)', operations.add, MODE_SECOND_IMMEDIATE, '1,4,5,6,10,20,0', '1,4,5,6,10,20,15', 15],
      ['multiply (first)', operations.multiply, MODE_FIRST_IMMEDIATE, '2,4,5,6,10,20,0', '2,4,5,6,10,20,80', 80],
      ['multiply (second)', operations.multiply, MODE_SECOND_IMMEDIATE, '2,4,5,6,10,20,0', '2,4,5,6,10,20,50', 50],
      ['input (first)', operations.input, MODE_FIRST_IMMEDIATE, '3,2', '3,2,1', 1],
      ['input (second)', operations.input, MODE_SECOND_IMMEDIATE, '3,2', '3,2,1', 1],
      ['output (first)', operations.output, MODE_FIRST_IMMEDIATE, '4,2,1', '4,2,1', 2],
      ['output (second)', operations.output, MODE_SECOND_IMMEDIATE, '4,2,1', '4,2,1', 1],
    ])('performs the %s operation', (opName, opFunc, mode, initialProgram, expectedProgram, expectedOutput) => {
      const program = (initialProgram as string).split(',').map(Number)
      const op = opFunc as Function
      const input = 1

      const { program: outProgram, output: actualOutput } = op(program, mode as Mode, INITIAL_ADDRESS, input)
      const actualProgram = outProgram.map(String).join(',')

      expect(actualProgram).toBe(expectedProgram)
      expect(actualOutput).toBe(expectedOutput)
    })

    test('what diagnostic code the program produces', async () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString()
      const program = input.split(',').map(Number)

      const result = solution1(program)

      const diagnosticCode = result.pop()
      const exitCodes = result.slice(0, result.length - 1)

      expect(exitCodes.every(value => value === 0)).toBe(true)
      expect(diagnosticCode).toBe(9654885)
    })
  })
})
