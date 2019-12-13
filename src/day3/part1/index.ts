type Coordinates = {
  x: number
  y: number
}

type Line = {
  startCoords: Coordinates
  endCoords: Coordinates
}

type Lines = {
  horizontal: Array<Line>
  vertical: Array<Line>
}

const solution = (input: Array<string>) => {
  const lines1 = drawWire(input[0]) as Lines
  const lines2 = drawWire(input[1]) as Lines
  return findMinimalDistance(lines1, lines2)
}

const drawWire = (path: string) => {
  const horizontalLines = [] as Array<Line>
  const verticalLines = [] as Array<Line>
  let currentCoords = { x: 0, y: 0 }
  let nextCoords = { ...currentCoords }
  let newX
  let newY

  path.split(',').forEach((instruction: string) => {
    const direction = instruction[0]
    const distance = Number(instruction.substr(1))

    switch (direction) {
      case 'U':
        newY = currentCoords.y + distance
        nextCoords = {
          ...currentCoords,
          y: newY,
        }
        verticalLines.push({
          startCoords: { ...currentCoords },
          endCoords: { ...nextCoords },
        })
        break
      case 'D':
        newY = currentCoords.y - distance
        nextCoords = {
          ...currentCoords,
          y: newY,
        }
        verticalLines.push({
          startCoords: { ...nextCoords },
          endCoords: { ...currentCoords },
        })
        break
      case 'L':
        newX = currentCoords.x - distance
        nextCoords = {
          ...currentCoords,
          x: newX,
        }
        horizontalLines.push({
          startCoords: { ...nextCoords },
          endCoords: { ...currentCoords },
        })
        break
      case 'R':
        newX = currentCoords.x + distance
        nextCoords = {
          ...currentCoords,
          x: newX,
        }
        horizontalLines.push({
          startCoords: { ...currentCoords },
          endCoords: { ...nextCoords },
        })
        break
    }
    currentCoords = { ...nextCoords }
  })

  return {
    horizontal: horizontalLines,
    vertical: verticalLines,
  }
}

const findMinimalDistance = (lines1: Lines, lines2: Lines) => {
  let minimalDistance = -1
  let distance

  lines1.horizontal.forEach(horizontalLine => {
    lines2.vertical.forEach(verticalLine => {
      distance = findIntersection(horizontalLine, verticalLine)
      if (distance > 0 && (distance < minimalDistance || minimalDistance === -1)) {
        minimalDistance = distance
      }
    })
  })

  lines2.horizontal.forEach(horizontalLine => {
    lines1.vertical.forEach(verticalLine => {
      distance = findIntersection(horizontalLine, verticalLine)
      if (distance > 0 && (distance < minimalDistance || minimalDistance === -1)) {
        minimalDistance = distance
      }
    })
  })

  return minimalDistance
}

const findIntersection = (horizontalLine: Line, verticalLine: Line) => {
  const verticalX = verticalLine.startCoords.x
  const horizontalY = horizontalLine.startCoords.y

  if (
    verticalX >= horizontalLine.startCoords.x &&
    verticalX <= horizontalLine.endCoords.x &&
    horizontalY >= verticalLine.startCoords.y &&
    horizontalY <= verticalLine.endCoords.y
  ) {
    return calculateDistance(verticalX, horizontalY)
  }

  return -1
}

const calculateDistance = (x: number, y: number) => {
  return Math.abs(x) + Math.abs(y)
}

export default solution
