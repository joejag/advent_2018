import _ from 'lodash'
import fs from 'fs'

export const readInstruction = (line) => {
  const stepRegex = /Step (.) must be finished before step (.) can begin./
  return {
    parent: stepRegex.exec(line)[1],
    child: stepRegex.exec(line)[2]
  }
}

export const findMainParent = (relations) => {
  const children = _.map(relations, (r) => r.child)
  return _.find(relations, (r) => !children.includes(r.parent)).parent
}

export const prequisites = (relations) => {
  const steps = _.sortBy(_.uniq(_.flatten(_.map(relations, (r) => [r.parent, r.child]))))
  return _.map(steps, (s) => {
    const prereqs =
    _.map(
      _.filter(relations, (r) => r.child === s),
      (s) => s.parent)
    return {
      step: s,
      prereq: prereqs
    }
  })
}

export const nextItem = (steps, completedSteps) => {
  const availableSteps = _.filter(steps, (s) => {
    return _.difference(s.prereq, completedSteps).length === 0 &&
     !_.includes(completedSteps, s.step)
  })
  return availableSteps[0].step
}

export const stepsOrderFor = (input) => {
  const parsedSteps = input.map(readInstruction)
  const steps = prequisites(parsedSteps)
  let completedSteps = []
  while (completedSteps.length !== steps.length) {
    completedSteps.push(nextItem(steps, completedSteps))
  }
  return _.join(completedSteps, '')
}

export default () => {
  const input = fs.readFileSync('./src/day_07.txt').toString().split('\n')

  console.log('7.1', stepsOrderFor(input))
}
