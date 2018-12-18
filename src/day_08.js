import _ from 'lodash'
import fs from 'fs'

const take = (array, count = 1) => _.times(count, () => array.shift())

export const parseTree = (input) => {
  const numbers = input.split(' ').map(Number)
  return parseChild(1, numbers)
}

const parseChild = (index, numbers) => {
  const childCount = take(numbers)
  const metaCount = take(numbers)
  const children = _.times(childCount, (i) => parseChild(index + i + 1, numbers))
  const meta = take(numbers, metaCount)
  return { index, meta, children }
}

export const sumMetaValues = (child) => {
  return _.sum(child.meta) +
   _.sum(_.map(child.children, sumMetaValues))
}

export const sumChildMetaValues = (tree) => {
  if (tree.children.length > 0) {
    const metadataToChildIndexes = _.map(tree.meta, (x) => x - 1)
    const childIndexesThatExist = _.filter(metadataToChildIndexes,
      (index) => tree.children.length > index)
    const childrenToCount = _.at(tree.children, childIndexesThatExist)
    return _.sum(_.map(childrenToCount, sumChildMetaValues))
  }
  return _.sum(tree.meta)
}

export default () => {
  const input = fs.readFileSync('./src/day_08.txt').toString()

  console.log('8.1', sumMetaValues(parseTree(input)))
  console.log('8.2', sumChildMetaValues(parseTree(input)))
}
