import { coordsCovered, parseElf, noOverlapId, overlapWithin } from './day_03'

it.only('can convert elf strings into something reasonable', () => {
  expect(parseElf('#123 @ 3,2: 3x2')).toEqual({
    id: 123,
    topLeft: { x: 3, y: 2 },
    width: 3,
    height: 2
  })
  expect(parseElf('#1324 @ 422,656: 23x14')).toEqual({
    id: 1324,
    topLeft: { x: 422, y: 656 },
    width: 23,
    height: 14
  })
})

it('can make cords from elf string', () => {
  expect(coordsCovered('#123 @ 3,2: 3x2')).toEqual([
    [3, 2], [4, 2], [5, 2],
    [3, 3], [4, 3], [5, 3]
  ])
})

it('should find overlap', () => {
  expect(overlapWithin([
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'])).toEqual([
    [3, 3], [4, 3],
    [3, 4], [4, 4]
  ])
})

it('finds non-overlap,', () => {
  expect(noOverlapId([
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
  ])).toEqual(3)
})
