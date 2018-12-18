import { sumChildMetaValues, sumMetaValues, parseTree } from './day_08'

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

// part 2

it('counts based on the metadata index - no children', () =>
  expect(sumChildMetaValues({
    index: 1,
    meta: [1, 1, 2],
    children: [] })).toEqual(4)
)

it('counts based on the metadata index - children', () =>
  expect(sumChildMetaValues({
    index: 1,
    meta: [1, 1, 2],
    children: [
      { index: 2, meta: [5], children: [] },
      { index: 3, meta: [10], children: [] }
    ] })).toEqual(20)
)

it('counts based on the metadata index - ignores bad index lookups', () =>
  expect(sumChildMetaValues({
    index: 1,
    meta: [1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    children: [
      { index: 2, meta: [5], children: [] },
      { index: 3, meta: [10], children: [] }
    ] })).toEqual(20)
)
