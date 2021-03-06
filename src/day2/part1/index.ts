type Positions = {
  one: number
  two: number
  toOverwrite: number
}

const calculatePositions = (array: Array<number>, position: number): Positions => {
  const one = array[position + 1]
  const two = array[position + 2]
  const toOverwrite = array[position + 3]
  return {
    one,
    two,
    toOverwrite,
  }
}

const operationAdd = (array: Array<number>, position: number): Array<number> => {
  const { one, two, toOverwrite } = calculatePositions(array, position)
  array[toOverwrite] = array[one] + array[two]
  return array
}

const operationMultiply = (array: Array<number>, position: number): Array<number> => {
  const { one, two, toOverwrite } = calculatePositions(array, position)
  array[toOverwrite] = array[one] * array[two]
  return array
}

export const program = (input: Array<number>): number => {
  let output = [...input]
  let opcode = 0
  let currentPosition = 0

  while (opcode != 99) {
    opcode = output[currentPosition]
    switch (opcode) {
      case 1:
        output = operationAdd(output, currentPosition)
        break
      case 2:
        output = operationMultiply(output, currentPosition)
        break
      case 99:
        continue
      default:
        throw Error('unknown opcode encountered')
    }
    currentPosition += 4
  }
  return output[0]
}

const solution = (input: Array<number>): number => {
  input[1] = 12
  input[2] = 2
  return program(input)
}

export default solution
