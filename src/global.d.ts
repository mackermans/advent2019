// Day 5

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

// Day 6

type OrbitalObject = string

type RawInput = Array<OrbitalObject>

type MapData = Map<OrbitalObject, Array<OrbitalObject>>

type Route = Array<OrbitalObject>

// Day 7

type ThrusterSignal = number

type PhaseSetting = 0 | 1 | 2 | 3 | 4

type PhaseSettingSequence = Array<PhaseSetting>
