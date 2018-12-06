import _ from 'lodash'

const stringToNumbers = (number) => number.split(' ').map(Number)

export const addItUp = (mathBits) => _.sum(stringToNumbers(mathBits))

export const findTheFreq = (mathBits) => {
  var parts = stringToNumbers(mathBits)
  const seenNumbers = []
  var currentNumber = parts.shift()

  while (parts.length !== 0) {
    const nextNumber = parts.shift()
    currentNumber = currentNumber + nextNumber
    if (seenNumbers.includes(currentNumber)) {
      return currentNumber
    }
    seenNumbers.push(currentNumber)

    if (parts.length === 0) {
      parts = stringToNumbers(mathBits)
    }
  }

  return currentNumber
}
