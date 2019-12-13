export const validateNumber = (number: number): boolean => {
  let lastDigit = -1
  let recurringMap = [] as Array<number>

  const digits = number
    .toString()
    .split('')
    .map(Number)

  if (digits.length !== 6) {
    return false
  }

  for (const digit of digits) {
    if (digit < lastDigit) {
      return false
    }
    if (digit === lastDigit) {
      recurringMap[digit] = recurringMap[digit] ? recurringMap[digit] + 1 : 2
    }
    lastDigit = digit
  }

  recurringMap = recurringMap.filter(Boolean)

  for (const count of recurringMap) {
    if (count === 2) {
      return true
    }
  }

  return false
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
