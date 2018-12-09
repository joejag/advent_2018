import _ from 'lodash'
import fs from 'fs'

const POLYMER_TO_REMOVE = ['Aa', 'aA', 'Bb', 'bB', 'Cc', 'cC', 'Dd', 'dD', 'Ee', 'eE', 'Ff', 'fF', 'Gg', 'gG', 'Hh', 'hH', 'Ii', 'iI', 'Jj', 'jJ', 'Kk', 'kK', 'Ll', 'lL', 'Mm', 'mM', 'Nn', 'nN', 'Oo', 'oO', 'Pp', 'pP', 'Qq', 'qQ', 'Rr', 'rR', 'Ss', 'sS', 'Tt', 'tT', 'Uu', 'uU', 'Vv', 'vV', 'Ww', 'wW', 'Xx', 'xX', 'Yy', 'yY', 'Zz', 'zZ']

export const alchemicalReduction = (input) => {
  let result = input

  const thingsRegEx = new RegExp(POLYMER_TO_REMOVE.join('|'))

  while (result.match(thingsRegEx)) {
    _.forEach(POLYMER_TO_REMOVE, (s) => {
      result = result.replace(s, '')
    })
  }

  return result
}

export const improvePolymer = (input) => {
  const possibles = _.map(POLYMER_TO_REMOVE, (s) => {
    let result = input
    result = result.replace(new RegExp(s[0], 'g'), '')
    result = result.replace(new RegExp(s[1], 'g'), '')
    return {
      letter: s[0],
      length: alchemicalReduction(result).length
    }
  })

  return _.minBy(possibles, 'length')
}

export default () => {
  const input = fs.readFileSync('./src/day_05.txt').toString()

  console.log('5.1', alchemicalReduction(input).length)
  console.log('5.2', improvePolymer(input))
}
