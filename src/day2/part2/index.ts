const solution = (input: Array<number>, expectedOutput: number) => {
  const MIN_INPUT = 0
  const MAX_INPUT = 99
  let noun = MIN_INPUT
  let verb = MIN_INPUT

  mainLoop: for (noun = MIN_INPUT; noun <= MAX_INPUT; noun++) {
    for (verb = MIN_INPUT; verb <= MAX_INPUT; verb++) {
      if (program(input, noun, verb) === expectedOutput) {
        break mainLoop
      }
    }
  }

  return 100 * noun + verb
}

export const program = (input: Array<number>, noun: number, verb: number) => {
  let output = [...input]
  let opcode = 0
  let currentAddress = 0

  output[1] = noun
  output[2] = verb

  while (opcode != 99) {
    opcode = output[currentAddress]
    switch (opcode) {
      case 1:
        output = operationAdd(output, currentAddress)
        break
      case 2:
        output = operationMultiply(output, currentAddress)
        break
      case 99:
        continue
      default:
        throw Error('unknown opcode encountered')
    }
    currentAddress += 4
  }
  return output[0]
}

const calculateAddresses = (array: Array<number>, address: number) => {
  const paramOne = array[address + 1]
  const paramTwo = array[address + 2]
  const paramThree = array[address + 3]
  return {
    paramOne,
    paramTwo,
    paramThree,
  }
}

const operationAdd = (array: Array<number>, address: number) => {
  const { paramOne, paramTwo, paramThree } = calculateAddresses(array, address)
  array[paramThree] = array[paramOne] + array[paramTwo]
  return array
}

const operationMultiply = (array: Array<number>, address: number) => {
  const { paramOne, paramTwo, paramThree } = calculateAddresses(array, address)
  array[paramThree] = array[paramOne] * array[paramTwo]
  return array
}

export default solution
