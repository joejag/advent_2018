import { findMainParent, prequisites, nextItem, readInstruction, stepsOrderFor } from './day_07'

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

it('can find the main parent', () => {
  expect(findMainParent([
    { parent: 'A', child: 'B' },
    { parent: 'B', child: 'C' },
    { parent: 'P', child: 'A' }
  ])).toEqual('P')
})

it('works out pre-requisites', () => {
  expect(prequisites([
    { parent: 'A', child: 'B' }
  ])).toEqual([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ])

  expect(prequisites([
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
  expect(nextItem([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ],
  [])).toEqual('A')

  expect(nextItem([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] }
  ], ['A'])).toEqual('B')

  expect(nextItem([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['C'] },
    { step: 'C', prereq: ['A'] }
  ], ['A'])).toEqual('C')

  expect(nextItem([
    { step: 'A', prereq: [] },
    { step: 'B', prereq: ['A'] },
    { step: 'C', prereq: ['A'] }
  ], ['A'])).toEqual('B')
})
