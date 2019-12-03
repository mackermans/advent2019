const solution = (input: Array<number>) => {
  const fuelSum = input.reduce((sum, value) => {
    const moduleFuelRequired = calculateFuel(value)
    return sum + moduleFuelRequired
  }, 0)
  return fuelSum
}

const calculateFuel = (mass: number) => {
  let massLeft = mass
  let sum = 0
  while (massLeft > 0) {
    massLeft = Math.floor(massLeft / 3) - 2
    if (massLeft > 0) {
      sum += massLeft
    }
  }
  return sum
}

export default solution
