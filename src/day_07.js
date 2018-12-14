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

export const nextStep = (steps, completedSteps, inProgress = []) => {
  return _.find(steps, (s) => {
    const prequisitesCompleted = _.difference(s.prereq, completedSteps).length === 0
    const hasntAlreadyRun = !_.includes(completedSteps, s.step)
    const notInProgress = !_.includes(inProgress, s.step)
    return prequisitesCompleted && hasntAlreadyRun && notInProgress
  })
}

export const stepsOrderFor = (input) => {
  const steps = calculatePrequisites(input.map(readInstruction))
  let completedSteps = []
  while (completedSteps.length !== steps.length) {
    completedSteps.push(nextStep(steps, completedSteps).step)
  }
  return _.join(completedSteps, '')
}

export const timeToComplete = (step) => step.toLowerCase().charCodeAt(0) - 97 + 1

export const partTwo = (input, workers, bonusTime = 0) => {
  const steps = calculatePrequisites(input.map(readInstruction))
  const stepsWithTime = _.map(steps, (s) => { return { ...s, time: timeToComplete(s.step) } })

  let completedSteps = []
  let inProgressSteps = []
  let timeTaken = 0

  let workerPool = _.times(workers, () => { return { timeLeftOnStep: 0, project: null } })

  while (completedSteps.length !== stepsWithTime.length) {
    if (timeTaken === 100000) return timeTaken

    workerPool = _.map(workerPool, (worker) => {
      if (worker.timeLeftOnStep === 0) {
        if (worker.project !== null) {
          completedSteps.push(worker.project)
          worker.project = null
        }

        const stepNext = nextStep(stepsWithTime, completedSteps, inProgressSteps)
        if (stepNext) {
          inProgressSteps.push(stepNext.step)
          return { timeLeftOnStep: bonusTime + stepNext.time - 1, project: stepNext.step }
        } else {
          return worker
        }
      } else {
        return { ...worker, timeLeftOnStep: worker.timeLeftOnStep - 1 }
      }
    })

    if (completedSteps.length === stepsWithTime.length) {
      return timeTaken
    }

    timeTaken++
  }
  return timeTaken
}

export default () => {
  const input = fs.readFileSync('./src/day_07.txt').toString().split('\n')

  console.log('7.1', stepsOrderFor(input))
  console.log('7.2', partTwo(input, 5, 60))
}
