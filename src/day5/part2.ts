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

const runProgram = (initialProgram: Program, systemId: number): DiagnosticOutput => {
  let program = [...initialProgram]
  const diagnosticOutput = [] as DiagnosticOutput
  let instruction: string
  let opcode = 0
  let mode: Mode
  let currentAddress = 0
  let output: number

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
        ;({ program, output } = operationInput(program, mode, currentAddress, systemId))
        currentAddress += 2
        break
      case 4:
        ;({ program, output } = operationOutput(program, mode, currentAddress))
        diagnosticOutput.push(output)
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
        console.log(`Final program (at address ${currentAddress}):`, program)
        console.log(`Diagnostic output: ${diagnosticOutput}`)
        throw Error(`unknown opcode encountered: ${opcode}`)
    }
  }

  return diagnosticOutput
}

const solution = (program: Program, systemId: number): DiagnosticOutput => {
  return runProgram(program, systemId)
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
