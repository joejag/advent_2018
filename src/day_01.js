import fs from 'fs'
import _ from 'lodash'

const stringToNumbers = (number) => number.split(' ').map(Number)

export const loopingArray = (array) => {
  var index = 0
  return () => {
    if (index === array.length) index = 0
    return array[index++]
  }
}

export const addItUp = (mathBits) => _.sum(stringToNumbers(mathBits))

export const findTheFreq = (mathBits) => {
  const nextValue = loopingArray(stringToNumbers(mathBits))
  const seenSums = [nextValue() + nextValue()]

  while (true) {
    const nextSum = nextValue() + _.last(seenSums)
    if (seenSums.includes(nextSum)) {
      return nextSum
    }
    seenSums.push(nextSum)
  }
}

export default () => {
  const dayOneInput = fs.readFileSync('./src/day_01.txt').toString().split('\n').join(' ')
  console.log('1.1:', addItUp(dayOneInput))
  console.log('1.2:', findTheFreq(dayOneInput))
}
