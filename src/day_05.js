import _ from 'lodash'
import fs from 'fs'

export const alchemicalReduction = (input) => {
  let result = input

  const thingsToRemove = ['Aa', 'aA', 'Bb', 'bB', 'Cc', 'cC', 'Dd', 'dD', 'Ee', 'eE', 'Ff', 'fF', 'Gg', 'gG', 'Hh', 'hH', 'Ii', 'iI', 'Jj', 'jJ', 'Kk', 'kK', 'Ll', 'lL', 'Mm', 'mM', 'Nn', 'nN', 'Oo', 'oO', 'Pp', 'pP', 'Qq', 'qQ', 'Rr', 'rR', 'Ss', 'sS', 'Tt', 'tT', 'Uu', 'uU', 'Vv', 'vV', 'Ww', 'wW', 'Xx', 'xX', 'Yy', 'yY', 'Zz', 'zZ']
  const thingsRegEx = new RegExp(thingsToRemove.join('|'))

  while (result.match(thingsRegEx)) {
    _.forEach(thingsToRemove, (s) => {
      result = result.replace(s, '')
    })
  }

  return result
}

export default () => {
  const input = fs.readFileSync('./src/day_05.txt').toString()

  console.log('5.1', alchemicalReduction(input).length)
}
