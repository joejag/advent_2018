import { sumMetaValues, parseTree } from './day_08'

it('handles minimal tree', () => {
  expect(parseTree('0 0')).toEqual(
    { index: 1, meta: [], children: [] }
  )
})

it('handles metadata', () => {
  expect(parseTree('0 2 9 7')).toEqual(
    { index: 1, meta: [9, 7], children: [] }
  )
})

it('handles children', () => {
  expect(parseTree('1 0 0 0')).toEqual(
    { index: 1,
      meta: [],
      children: [ { index: 2, meta: [], children: [] } ] }
  )
})

it('handles multiple children', () => {
  expect(parseTree('2 0 0 0 0 1 9')).toEqual(
    { index: 1,
      meta: [],
      children: [
        { index: 2, meta: [], children: [] },
        { index: 3, meta: [9], children: [] }
      ] }
  )
})

it('can count the metadata in a given tree', () => {
  expect(sumMetaValues({
    index: 1,
    meta: [1, 2, 3, 4],
    children: [
      { index: 2, meta: [5, 6], children: [] },
      { index: 3, meta: [7, 8, 9], children: [] }
    ] })).toEqual(45)
})
