import _ from 'lodash'
import fs from 'fs'

export const coordidinatesWithin = (cords) => {
  const maxWidth = _.max(cords.map((c) => c[0]))
  const maxHeight = _.max(cords.map((c) => c[1]))

  const topRow = _.times(maxWidth + 1, (i) => {
    return [0 + i, 0]
  })
  return _.flatten(_.times(maxHeight + 1, (i) => {
    return topRow.map((cords) => [cords[0], cords[1] + i])
  }))
}

export const manhattenDistance = (left, right) => {
  const x1 = Math.abs(left[0])
  const y1 = Math.abs(left[1])
  const x2 = Math.abs(right[0])
  const y2 = Math.abs(right[1])
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

export const nearestInManhatten = (to, candidates) => {
  const distances = _.map(candidates, (c) => {
    return {
      distance: manhattenDistance(to, c),
      cord: c
    }
  })
  return _.minBy(distances, (d) => d.distance).cord
}

export const isEdgeCord = (cord, cords) => {
  const maxWidth = _.max(cords.map((c) => c[0]))
  const maxHeight = _.max(cords.map((c) => c[1]))

  const x = cord[0]
  const y = cord[1]

  return x === 0 || y === 0 || x === maxWidth || y === maxHeight
}

export const chronalCoordinates = (cords) => {
  const cordsToCheckForArea = coordidinatesWithin(cords)
  const calculateDistances = _.map(cordsToCheckForArea, (cord) => {
    return {
      cord: cord,
      nearestCord: nearestInManhatten(cord, cords),
      edge: isEdgeCord(cord, cords)
    }
  })

  const infiniteCords =
  _.uniq(
    _.map(_.filter(calculateDistances, (cd) => cd.edge === true),
      (livingOnTheEdge) => livingOnTheEdge.nearestCord))

  const placesToCount =
  _.countBy(
    _.filter(calculateDistances, (cd) => {
      return !infiniteCords.includes(cd.nearestCord)
    })
    , (cd) => cd.nearestCord)

  const largestFiniteCord = _.maxBy(_.entries(placesToCount), '[1]')
  return {
    biggestArea: largestFiniteCord[0],
    sizeOfArea: largestFiniteCord[1]
  }
}

export const findSafeZone = (cords, limit) => {
  const distances = _.map(coordidinatesWithin(cords), (c) => {
    return {
      distance: sumOfManhattensToPoint(c, cords),
      cord: c
    }
  })

  const safeZones = _.filter(distances, (d) => d.distance < limit)
  return safeZones.length
}

export const sumOfManhattensToPoint = (cord, cords) => {
  return _.sum(
    _.map(cords, (c) => manhattenDistance(cord, c)))
}

export default () => {
  const input = fs.readFileSync('./src/day_06.txt').toString().split('\n')
  const inputParsed = _.map(input, (line) => line.split(',').map(Number))

  console.log('6.1', chronalCoordinates(inputParsed))
  console.log('6.2', findSafeZone(inputParsed, 10000))
}
