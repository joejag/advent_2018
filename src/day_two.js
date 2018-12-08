import _ from 'lodash'

export const superSimilarWords = (wordsString) => {
  const words = wordsString.split(' ')
  while (words.length !== 0) {
    const candidate = words.shift()
    const potentialMatches = words
      .map((word) => differenceBetween(candidate, word))
      .filter((letters) => letters.length > 0)

    if (potentialMatches.length > 0) {
      return _.join(potentialMatches[0], '')
    }
  }
  return []
}

export const differenceBetween = (left, right) => {
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
