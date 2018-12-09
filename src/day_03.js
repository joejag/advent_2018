import _ from 'lodash'
import fs from 'fs'

export const parseElf = (elfString) => {
  const elfClaimParts = /^#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/.exec(elfString)
  return {
    id: parseInt(elfClaimParts[1]),
    topLeft: {
      x: parseInt(elfClaimParts[2]),
      y: parseInt(elfClaimParts[3])
    },
    width: parseInt(elfClaimParts[4]),
    height: parseInt(elfClaimParts[5])
  }
}

export const coordsCovered = (elfString) => {
  const elfClaim = parseElf(elfString)
  const topRow = _.times(elfClaim.width, (i) => {
    return [elfClaim.topLeft.x + i, elfClaim.topLeft.y]
  })
  return _.flatten(_.times(elfClaim.height, (i) => {
    return topRow.map((cords) => [cords[0], cords[1] + i])
  }))
}

export const overlapWithin = (elfStrings) => {
  const cords = elfStrings.map((elfString) => coordsCovered(elfString))
  const allCords = _.flatten(cords)
  const frequencies = _.countBy(allCords)

  return _.keys(_.pickBy(frequencies, (value, key) => value > 1))
    .map((cords) => cords.split(',').map(Number))
}

export const noOverlapId = (elfStrings) => {
  const cordsWithDetails = elfStrings.map((elfString) =>
    ({
      details: parseElf(elfString),
      cords: coordsCovered(elfString)
    }))

  const overlappingCords = overlapWithin(elfStrings)

  return _.filter(cordsWithDetails, (candidate) =>
    _.intersectionBy(candidate.cords, overlappingCords, (c) => c.toString()).length === 0
  ).map((a) => a.details.id)[0]
}

export default () => {
  const dayThreeInput = fs.readFileSync('./src/day_03.txt').toString().split('\n')
  console.log('3.1:', overlapWithin(dayThreeInput).length)
  // console.log('3.2:', noOverlapId(dayThreeInput))
}
