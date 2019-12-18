const originObject = 'COM'

const buildMapData = (input: RawInput): MapData => {
  const data = new Map() as MapData

  input.forEach(relation => {
    const [parentObject, childObject] = relation.split(')')
    const currentObjects = data.get(parentObject) || []
    data.set(parentObject, [...currentObjects, childObject])
  })

  return data
}

const solution = (input: RawInput): number => {
  const data = buildMapData(input)
  let totalOrbits = 0

  const countOrbits = (parentObject: OrbitalObject, level = 0 as number): void => {
    totalOrbits += level

    const children = data.get(parentObject)

    if (!children) {
      return
    }

    children.forEach(child => {
      countOrbits(child, level + 1)
    })
  }

  countOrbits(originObject)

  return totalOrbits
}

export default solution
