import _ from 'lodash'

export const parseElf = (elfString) => {
  const bits = elfString.split(' ')
  return {
    id: parseInt(bits[0].split('#')[1]),
    topLeft: {
      x: parseInt(bits[2].split(',')[0]),
      y: parseInt(bits[2].replace(':', '').split(',')[1])
    },
    width: parseInt(bits[3].split('x')[0]),
    height: parseInt(bits[3].split('x')[1])
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
