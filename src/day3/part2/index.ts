type Coordinates = {
  x: number
  y: number
}

type Line = {
  stepsAtStart: number
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
  return findMinimalSteps(lines1, lines2)
}

const drawWire = (path: string) => {
  const horizontalLines = [] as Array<Line>
  const verticalLines = [] as Array<Line>
  let currentCoords = { x: 0, y: 0 }
  let nextCoords = { ...currentCoords }
  let newX
  let newY
  let steps = 0

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
          stepsAtStart: steps,
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
          stepsAtStart: steps,
          startCoords: { ...currentCoords },
          endCoords: { ...nextCoords },
        })
        break
      case 'L':
        newX = currentCoords.x - distance
        nextCoords = {
          ...currentCoords,
          x: newX,
        }
        horizontalLines.push({
          stepsAtStart: steps,
          startCoords: { ...currentCoords },
          endCoords: { ...nextCoords },
        })
        break
      case 'R':
        newX = currentCoords.x + distance
        nextCoords = {
          ...currentCoords,
          x: newX,
        }
        horizontalLines.push({
          stepsAtStart: steps,
          startCoords: { ...currentCoords },
          endCoords: { ...nextCoords },
        })
        break
    }
    currentCoords = { ...nextCoords }
    steps += distance
  })

  return {
    horizontal: horizontalLines,
    vertical: verticalLines,
  }
}

const findMinimalSteps = (lines1: Lines, lines2: Lines) => {
  let minimalSteps = -1
  let steps

  lines1.horizontal.forEach(horizontalLine => {
    lines2.vertical.forEach(verticalLine => {
      steps = findIntersectionSteps(horizontalLine, verticalLine)
      if ((steps > -1 && steps < minimalSteps) || minimalSteps === -1) {
        minimalSteps = steps
      }
    })
  })

  lines2.horizontal.forEach(horizontalLine => {
    lines1.vertical.forEach(verticalLine => {
      steps = findIntersectionSteps(horizontalLine, verticalLine)
      if ((steps > -1 && steps < minimalSteps) || minimalSteps === -1) {
        minimalSteps = steps
      }
    })
  })

  return minimalSteps
}

const findIntersectionSteps = (horizontalLine: Line, verticalLine: Line) => {
  const horizontalY = horizontalLine.startCoords.y
  const verticalX = verticalLine.startCoords.x

  if (
    ((verticalX >= horizontalLine.startCoords.x && verticalX <= horizontalLine.endCoords.x) ||
      (verticalX <= horizontalLine.startCoords.x && verticalX >= horizontalLine.endCoords.x)) &&
    ((horizontalY >= verticalLine.startCoords.y && horizontalY <= verticalLine.endCoords.y) ||
      (horizontalY <= verticalLine.startCoords.y && horizontalY >= verticalLine.endCoords.y)) &&
    !(verticalX === 0 && horizontalY === 0)
  ) {
    const horizontalSteps = horizontalLine.stepsAtStart + Math.abs(verticalX - horizontalLine.startCoords.x)
    const verticalSteps = verticalLine.stepsAtStart + Math.abs(horizontalY - verticalLine.startCoords.y)
    return horizontalSteps + verticalSteps
  }

  return -1
}

export default solution
