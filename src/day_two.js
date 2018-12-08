import _ from 'lodash'

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
