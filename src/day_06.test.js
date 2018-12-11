import { coordidinatesWithin, isEdgeCord, nearestInManhatten, manhattenDistance, chronalCoordinates } from './day_06'

it('can make an appropriately sized grid', () => {
  expect(coordidinatesWithin([[1, 2]])).toEqual(
    [
      [0, 0], [1, 0],
      [0, 1], [1, 1],
      [0, 2], [1, 2]
    ]
  )
  expect(coordidinatesWithin([[1, 2], [3, 3]])).toEqual(
    [
      [0, 0], [1, 0], [2, 0], [3, 0],
      [0, 1], [1, 1], [2, 1], [3, 1],
      [0, 2], [1, 2], [2, 2], [3, 2],
      [0, 3], [1, 3], [2, 3], [3, 3]
    ]
  )
})

it('can work on manhatten distance', () => {
  expect(manhattenDistance([0, 0], [0, 0])).toBe(0)
  expect(manhattenDistance([0, 0], [4, 0])).toBe(4)
  expect(manhattenDistance([4, 0], [0, 0])).toBe(4)
  expect(manhattenDistance([4, 4], [0, 0])).toBe(8)
  expect(manhattenDistance([-4, -4], [0, 0])).toBe(8)
})

it('calculates chronical distance', () => {
  const cords = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]]
  expect(chronalCoordinates(cords)).toEqual({
    biggestArea: '5,5',
    sizeOfArea: 17
  })
})

it('can find the nearest taxi to a point', () => {
  expect(nearestInManhatten([1, 1], [[2, 2], [3, 3]])).toEqual([2, 2])
  expect(nearestInManhatten([1, 1], [[10, 10], [10, 0]])).toEqual([10, 0])
})

it('can find edge cords', () => {
  expect(isEdgeCord([0, 0], [[1, 2], [3, 3]])).toBe(true)
  expect(isEdgeCord([1, 0], [[1, 2], [3, 3]])).toBe(true)
  expect(isEdgeCord([1, 1], [[1, 2], [3, 3]])).toBe(false)
  expect(isEdgeCord([2, 1], [[1, 2], [3, 3]])).toBe(false)
  expect(isEdgeCord([1, 3], [[1, 2], [3, 3]])).toBe(true)
})
