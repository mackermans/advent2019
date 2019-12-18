const originObject = 'COM'
const youObject = 'YOU'
const santaObject = 'SAN'

const buildMapData = (input: RawInput): MapData => {
  const data = new Map() as MapData

  input.forEach(relation => {
    const [parentObject, childObject] = relation.split(')')
    const currentObjects = data.get(parentObject) || []
    data.set(parentObject, [...currentObjects, childObject])
  })

  return data
}

const calculateOrbitalTransfers = (ancestorIndex: number, firstRoute: Route, secondRoute: Route): number => {
  const firstDistanceToCommonAncestor = firstRoute.length - ancestorIndex - 2
  const secondDistanceToCommonAncestor = secondRoute.length - ancestorIndex - 2
  return firstDistanceToCommonAncestor + secondDistanceToCommonAncestor
}

const findFirstCommonAncestor = (firstRoute: Route, secondRoute: Route): number => {
  let ancestorIndex = -1

  for (let i = 0; i < firstRoute.length; i++) {
    if (firstRoute[i] !== secondRoute[i]) {
      break
    }

    ancestorIndex = i
  }

  return ancestorIndex
}

const solution = (input: RawInput): number => {
  const data = buildMapData(input)
  let youRoute = [] as Route
  let santaRoute = [] as Route

  const plotRoute = (parentObject: OrbitalObject, route = [] as Route): void => {
    const children = data.get(parentObject)

    if (!children) {
      return
    }

    children.forEach(child => {
      const newRoute = [...route, child]

      if (child === youObject) {
        youRoute = newRoute
      }

      if (child === santaObject) {
        santaRoute = newRoute
      }

      plotRoute(child, newRoute)
    })
  }

  plotRoute(originObject)
  const ancestorIndex = findFirstCommonAncestor(youRoute, santaRoute)
  const orbitalTransfer = calculateOrbitalTransfers(ancestorIndex, youRoute, santaRoute)

  return orbitalTransfer
}

export default solution
