const solution = (input: Array<number>): number => {
  const fuelSum = input.reduce((sum, value) => {
    const moduleFuelRequired = Math.floor(value / 3) - 2
    return sum + moduleFuelRequired
  }, 0)
  return fuelSum
}

export default solution
