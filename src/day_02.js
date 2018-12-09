import fs from 'fs'
import _ from 'lodash'

export const wordsWithOnlyOneCharacterDifference = (wordsString) => {
  const words = wordsString.split(' ')
  while (words.length !== 0) {
    const candidate = words.shift()
    const potentialMatches = words
      .map((word) => sharedLettersInWordsWithOneDifference(candidate, word))
      .filter((letters) => letters.length > 0)

    if (potentialMatches.length > 0) {
      return _.join(potentialMatches[0], '')
    }
  }
  return []
}

export const sharedLettersInWordsWithOneDifference = (left, right) => {
  const leftLetters = left.split('')
  const rightLetters = right.split('')
  const matchingLetters = _.zip(leftLetters, rightLetters)
    .filter((pair) => pair[0] === pair[1])
    .map((pair) => pair[0])

  if (matchingLetters.length === leftLetters.length - 1) {
    return matchingLetters
  }
  return []
}

export const letterOccurs = (word, occurancesDesired) => {
  const frequencies = _.countBy(word.split(''))
  return _.values(frequencies).includes(occurancesDesired)
}

export const checkSum = (wordsString) => {
  const words = wordsString.split(' ')
  const twosCount = words
    .map((w) => letterOccurs(w, 2))
    .filter((w) => w)
    .length
  const threesCount = words
    .map((w) => letterOccurs(w, 3))
    .filter((w) => w)
    .length
  return twosCount * threesCount
}

export default () => {
  const dayTwoInput = fs.readFileSync('./src/day_02.txt').toString().split('\n').join(' ')

  console.log('2.1:', checkSum(dayTwoInput))
  console.log('2.2:', wordsWithOnlyOneCharacterDifference(dayTwoInput))
}
