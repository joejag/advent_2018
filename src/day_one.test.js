import { addItUp } from './day_one'

describe('adding things', () => {
  test('+1, +1, -2 results in 0', () => expect(addItUp('+1 +1 -2')).toBe(0))
  test('+1, +1, +1 results in  3', () => expect(addItUp('+1 +1 +1')).toBe(3))
  test('-1, -2, -3 results in -6', () => expect(addItUp('-1 -2 -3')).toBe(-6))
})
