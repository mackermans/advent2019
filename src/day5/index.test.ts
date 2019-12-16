import fs from 'fs'
import path from 'path'

import solution1, { operations as operations1 } from './part1'
import solution2, { operations as operations2 } from './part2'

const MODE_FIRST = {
  first: 1,
  second: 0,
  third: 0,
}
const MODE_SECOND = {
  first: 0,
  second: 1,
  third: 0,
}
const INITIAL_ADDRESS = 0

describe('Day 5', () => {
  describe('Part 1', () => {
    test.each([
      ['add (first)', operations1.add, MODE_FIRST, '1,4,5,6,10,20,0', '1,4,5,6,10,20,24', 24],
      ['add (second)', operations1.add, MODE_SECOND, '1,4,5,6,10,20,0', '1,4,5,6,10,20,15', 15],
      ['multiply (first)', operations1.multiply, MODE_FIRST, '2,4,5,6,10,20,0', '2,4,5,6,10,20,80', 80],
      ['multiply (second)', operations1.multiply, MODE_SECOND, '2,4,5,6,10,20,0', '2,4,5,6,10,20,50', 50],
      ['input (first)', operations1.input, MODE_FIRST, '3,2', '3,2,1', 1],
      ['input (second)', operations1.input, MODE_SECOND, '3,2', '3,2,1', 1],
      ['output (first)', operations1.output, MODE_FIRST, '4,2,1', '4,2,1', 2],
      ['output (second)', operations1.output, MODE_SECOND, '4,2,1', '4,2,1', 1],
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

  describe('Part 2', () => {
    test.each([
      ['add (first)', operations2.add, MODE_FIRST, '1,4,5,6,10,20,0', '1,4,5,6,10,20,24', 24],
      ['add (second)', operations2.add, MODE_SECOND, '1,4,5,6,10,20,0', '1,4,5,6,10,20,15', 15],
      ['multiply (first)', operations2.multiply, MODE_FIRST, '2,4,5,6,10,20,0', '2,4,5,6,10,20,80', 80],
      ['multiply (second)', operations2.multiply, MODE_SECOND, '2,4,5,6,10,20,0', '2,4,5,6,10,20,50', 50],
      ['input (first)', operations2.input, MODE_FIRST, '3,2', '3,2,1', 1],
      ['input (second)', operations2.input, MODE_SECOND, '3,2', '3,2,1', 1],
      ['output (first)', operations2.output, MODE_FIRST, '4,2,1', '4,2,1', 2],
      ['output (second)', operations2.output, MODE_SECOND, '4,2,1', '4,2,1', 1],
      ['jumpIfTrue (first, jump/non-zero)', operations2.jumpIfTrue, MODE_FIRST, '5,3,4,0,9', '5,3,4,0,9', 9],
      ['jumpIfTrue (first, no jump/zero)', operations2.jumpIfTrue, MODE_FIRST, '5,0,10,0', '5,0,10,0', 3],
      ['jumpIfTrue (second, jump/non-zero)', operations2.jumpIfTrue, MODE_SECOND, '5,3,10,5', '5,3,10,5', 10],
      ['jumpIfTrue (second, no jump/zero)', operations2.jumpIfTrue, MODE_SECOND, '5,3,10,0', '5,3,10,0', 3],
      ['jumpIfFalse (first, jump/zero)', operations2.jumpIfFalse, MODE_FIRST, '6,0,3,9', '6,0,3,9', 9],
      ['jumpIfFalse (first, no jump/non-zero)', operations2.jumpIfFalse, MODE_FIRST, '6,5,3', '6,5,3', 3],
      ['jumpIfFalse (second, jump/zero)', operations2.jumpIfFalse, MODE_SECOND, '6,3,8,0', '6,3,8,0', 8],
      ['jumpIfFalse (second, no jump/non-zero)', operations2.jumpIfFalse, MODE_SECOND, '6,3,5,9', '6,3,5,9', 3],
      ['lessThan (first, true)', operations2.lessThan, MODE_FIRST, '7,4,4,5,10', '7,4,4,5,10,1', 1],
      ['lessThan (first, false)', operations2.lessThan, MODE_FIRST, '7,4,4,5,4', '7,4,4,5,4,0', 0],
      ['lessThan (second, true)', operations2.lessThan, MODE_SECOND, '7,4,5,5,4', '7,4,5,5,4,1', 1],
      ['lessThan (second, false)', operations2.lessThan, MODE_SECOND, '7,4,5,5,5', '7,4,5,5,5,0', 0],
      ['equals (first, true)', operations2.equals, MODE_FIRST, '7,4,4,5,4', '7,4,4,5,4,1', 1],
      ['equals (first, false)', operations2.equals, MODE_FIRST, '7,4,4,5,10', '7,4,4,5,10,0', 0],
      ['equals (second, true)', operations2.equals, MODE_SECOND, '7,4,10,5,10', '7,4,10,5,10,1', 1],
      ['equals (second, false)', operations2.equals, MODE_SECOND, '7,4,5,5,10', '7,4,5,5,10,0', 0],
    ])('performs the %s operation', (opName, opFunc, mode, initialProgram, expectedProgram, expectedOutput) => {
      const program = (initialProgram as string).split(',').map(Number)
      const op = opFunc as Function
      const input = 1

      const { program: outProgram, output: actualOutput } = op(program, mode as Mode, INITIAL_ADDRESS, input)
      const actualProgram = outProgram.map(String).join(',')

      expect(actualProgram).toBe(expectedProgram)
      expect(actualOutput).toBe(expectedOutput)
    })

    test.each([
      ['position zero', '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 0, 0],
      ['position non-zero', '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 1, 1],
      ['immediate zero', '3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 0, 0],
      ['immediate non-zero', '3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 1, 1],
      [
        'less than 8',
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
        7,
        999,
      ],
      [
        'equal to 8',
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
        8,
        1000,
      ],
      [
        'greater than 8',
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
        9,
        1001,
      ],
    ])('example test: %s', (testName, initialProgram, systemId, expectedOutput) => {
      const program = (initialProgram as string).split(',').map(Number)
      const result = solution2(program, systemId as number)

      expect(result[0]).toBe(expectedOutput)
    })

    test('what diagnostic code the program produces', async () => {
      const initialProgram = fs.readFileSync(path.join(__dirname, 'input.txt')).toString()
      const program = initialProgram.split(',').map(Number)
      const systemId = 5

      const result = solution2(program, systemId)

      const diagnosticCode = result.pop()
      const exitCodes = result.slice(0, result.length - 1)

      expect(exitCodes.every(value => value === 0)).toBe(true)
      expect(diagnosticCode).toBe(7079459)
    })
  })
})
