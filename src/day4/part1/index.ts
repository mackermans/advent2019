export const validateNumber = (number: number): boolean => {
  let lastDigit = -1
  let decreasing = false
  let doubleFound = false

  const digits = number
    .toString()
    .split('')
    .map(Number)

  if (digits.length !== 6) {
    return false
  }

  for (const digit of digits) {
    if (digit < lastDigit) {
      decreasing = true
      break
    }
    if (digit === lastDigit) {
      doubleFound = true
    }
    lastDigit = digit
  }

  return !decreasing && doubleFound
}

const solution = (input: string): number => {
  const [lowerBound, upperBound] = input.split('-').map(Number)
  let amount = 0
  let currentNumber = lowerBound

  while (currentNumber <= upperBound) {
    if (validateNumber(currentNumber)) {
      amount++
    }
    currentNumber++
  }
  return amount
}

export default solution
