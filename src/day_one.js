import _ from 'lodash'

const stringToNumbers = (number) => number.split(' ').map(Number)

export const addItUp = (mathBits) => _.sum(stringToNumbers(mathBits))
