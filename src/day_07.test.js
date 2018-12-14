import { partTwo, timeToComplete, calculatePrequisites, nextStep, readInstruction, stepsOrderFor } from './day_07'

it('can work out steps', () => {
  const steps = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.']

  expect(stepsOrderFor(steps)).toEqual('CABDFE')
})

it('parses instructions', () => {
  expect(readInstruction('Step C must be finished before step A can begin.'))
    .toEqual({ parent: 'C', child: 'A' })
  expect(readInstruction('Step C must be finished before step F can begin.'))
    .toEqual({ parent: 'C', child: 'F' })
})

it('works out pre-requisites', () => {
  expect(calculatePrequisites([
    { parent: 'A', child: 'B' }
  ])).toEqual([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ])

  expect(calculatePrequisites([
    { parent: 'A', child: 'B' },
    { parent: 'B', child: 'C' },
    { parent: 'P', child: 'A' }
  ])).toEqual([
    { step: 'A', prereq: ['P'] },
    { step: 'B', prereq: ['A'] },
    { step: 'C', prereq: ['B'] },
    { step: 'P', prereq: [] }
  ])
})

it('works out order', () => {
  expect(nextStep([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ],
  []).step).toEqual('A')

  expect(nextStep([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ], ['A']).step).toEqual('B')

  expect(nextStep([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['C'] },
    { step: 'C', prereq: ['A'] }
  ], ['A']).step).toEqual('C')

  expect(nextStep([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] },
    { step: 'C', prereq: ['A'] }
  ], ['A']).step).toEqual('B')
})

it('knows how long a step takes', () => {
  expect(timeToComplete('A')).toEqual(1)
  expect(timeToComplete('a')).toEqual(1)
  expect(timeToComplete('Z')).toEqual(26)
})

it('should consider time', () => {
  const steps = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.']

  expect(partTwo(steps, 1)).toEqual(21)
  expect(partTwo(steps, 2)).toEqual(15)
})
