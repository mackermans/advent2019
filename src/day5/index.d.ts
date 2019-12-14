interface Addresses {
  addressOne: number
  addressTwo: number
  addressThree: number
}

type Program = Array<number>

type DiagnosticOutput = Array<number>

interface Mode {
  first: number
  second: number
  third: number
}

interface OperationResult {
  program: Program
  output: number
}
