import _ from 'lodash'
import fs from 'fs'

export const readInstruction = (line) => {
  const stepRegex = /Step (.) must be finished before step (.) can begin./
  return {
    parent: stepRegex.exec(line)[1],
    child: stepRegex.exec(line)[2]
  }
}

export const calculatePrequisites = (relations) => {
  const steps = _.sortBy(_.uniq(_.flatten(_.map(relations, (r) => [r.parent, r.child]))))
  return _.map(steps, (s) => {
    const preReqRelations = _.filter(relations, (r) => r.child === s)
    return {
      step: s,
      prereq: _.map(preReqRelations, (s) => s.parent)
    }
  })
}

export const nextStep = (steps, completedSteps) => {
  return _.find(steps, (s) => {
    const prequisitesCompleted = _.difference(s.prereq, completedSteps).length === 0
    const hasntAlreadyRun = !_.includes(completedSteps, s.step)
    return prequisitesCompleted && hasntAlreadyRun
  }).step
}

export const stepsOrderFor = (input) => {
  const steps = calculatePrequisites(input.map(readInstruction))
  let completedSteps = []
  while (completedSteps.length !== steps.length) {
    completedSteps.push(nextStep(steps, completedSteps))
  }
  return _.join(completedSteps, '')
}

export default () => {
  const input = fs.readFileSync('./src/day_07.txt').toString().split('\n')

  console.log('7.1', stepsOrderFor(input))
}
