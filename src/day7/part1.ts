const parseMode = (mode: number | undefined): Mode => {
  if (!mode) {
    return {
      first: 0,
      second: 0,
      third: 0,
    }
  }

  return {
    first: Math.floor(mode % 10),
    second: Math.floor((mode / 10) % 10),
    third: Math.floor((mode / 100) % 10),
  }
}

const findAllPermutations = (input: Array<unknown>): Array<Array<unknown>> => {
  return input.reduce(function permute(
    res: Array<Array<unknown>>,
    item: unknown,
    key: number,
    arr: Array<unknown>,
  ): Array<Array<unknown>> {
    return res.concat(
      (arr.length > 1 &&
        arr
          .slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map(function(perm: Array<unknown>): Array<unknown> {
            return [item].concat(perm)
          })) || [item],
    )
  },
  [])
}

const operationAdd = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const addressToWrite = program[address + 3]

  const writeValue = firstValue + secondValue
  program[addressToWrite] = writeValue

  return { program, output: writeValue }
}

const operationMultiply = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const addressToWrite = program[address + 3]

  const writeValue = firstValue * secondValue
  program[addressToWrite] = writeValue

  return { program, output: writeValue }
}

const operationInput = (program: Program, mode: Mode, address: number, input: number): OperationResult => {
  const addressToWrite = program[address + 1]
  program[addressToWrite] = input
  return { program, output: input }
}

const operationOutput = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  return { program, output: firstValue }
}

const operationJumpIfTrue = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const targetAddress = firstValue !== 0 ? secondValue : address + 3
  return { program, output: targetAddress }
}

const operationJumpIfFalse = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const targetAddress = firstValue === 0 ? secondValue : address + 3
  return { program, output: targetAddress }
}

const operationLessThan = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const addressToWrite = program[address + 3]

  const writeValue = firstValue < secondValue ? 1 : 0
  program[addressToWrite] = writeValue

  return { program, output: writeValue }
}

const operationEquals = (program: Program, mode: Mode, address: number): OperationResult => {
  const firstParam = program[address + 1]
  const secondParam = program[address + 2]
  const firstValue = mode.first === 1 ? firstParam : program[firstParam]
  const secondValue = mode.second === 1 ? secondParam : program[secondParam]
  const addressToWrite = program[address + 3]

  const writeValue = firstValue === secondValue ? 1 : 0
  program[addressToWrite] = writeValue

  return { program, output: writeValue }
}

const runProgram = (
  initialProgram: Program,
  phaseSetting: PhaseSetting,
  inputSignal: ThrusterSignal,
): ThrusterSignal => {
  let program = [...initialProgram]
  let output: number
  let instruction: string
  let opcode = 0
  let mode: Mode
  let currentAddress = 0
  let phaseSettingConsumed = false
  let outputThrusterSignal = -1 as ThrusterSignal

  while (opcode != 99) {
    instruction = program[currentAddress].toString()
    mode = parseMode(Number(instruction.substring(0, instruction.length - 2)))
    opcode = Number(instruction.slice(-2))

    switch (opcode) {
      case 1:
        ;({ program, output } = operationAdd(program, mode, currentAddress))
        currentAddress += 4
        break
      case 2:
        ;({ program, output } = operationMultiply(program, mode, currentAddress))
        currentAddress += 4
        break
      case 3:
        ;({ program, output } = operationInput(
          program,
          mode,
          currentAddress,
          phaseSettingConsumed ? inputSignal : phaseSetting,
        ))
        phaseSettingConsumed = true
        currentAddress += 2
        break
      case 4:
        ;({ program, output } = operationOutput(program, mode, currentAddress))
        outputThrusterSignal = output as ThrusterSignal
        currentAddress += 2
        break
      case 5:
        ;({ program, output } = operationJumpIfTrue(program, mode, currentAddress))
        currentAddress = output
        break
      case 6:
        ;({ program, output } = operationJumpIfFalse(program, mode, currentAddress))
        currentAddress = output
        break
      case 7:
        ;({ program, output } = operationLessThan(program, mode, currentAddress))
        currentAddress += 4
        break
      case 8:
        ;({ program, output } = operationEquals(program, mode, currentAddress))
        currentAddress += 4
        break
      case 99:
        continue
      default:
        throw Error(`unknown opcode encountered: ${opcode}`)
    }
  }

  return outputThrusterSignal
}

const findHighestThrusterSignal = (program: Program): ThrusterSignal => {
  const initialPhaseSettingSequence = [0, 1, 2, 3, 4] as PhaseSettingSequence
  const sequences = findAllPermutations(initialPhaseSettingSequence) as Array<PhaseSettingSequence>
  let highestOutputSignal = -1

  sequences.forEach(sequence => {
    const firstSignal = runProgram(program, sequence[0], 0)
    const secondSignal = runProgram(program, sequence[1], firstSignal)
    const thirdSignal = runProgram(program, sequence[2], secondSignal)
    const fourthSignal = runProgram(program, sequence[3], thirdSignal)
    const fifthSignal = runProgram(program, sequence[4], fourthSignal)
    if (fifthSignal > highestOutputSignal) {
      highestOutputSignal = fifthSignal
    }
  })

  return highestOutputSignal
}

const solution = (program: Program): ThrusterSignal => {
  const signal = findHighestThrusterSignal(program)
  return signal
}

export default solution

export const operations = {
  add: operationAdd,
  multiply: operationMultiply,
  input: operationInput,
  output: operationOutput,
  jumpIfTrue: operationJumpIfTrue,
  jumpIfFalse: operationJumpIfFalse,
  lessThan: operationLessThan,
  equals: operationEquals,
}
