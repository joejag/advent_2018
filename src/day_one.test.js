import { addItUp, findTheFreq } from './day_one'

test('+1, +1, -2 results in 0', () => expect(addItUp('+1 +1 -2')).toBe(0))
test('+1, +1, +1 results in  3', () => expect(addItUp('+1 +1 +1')).toBe(3))
test('-1, -2, -3 results in -6', () => expect(addItUp('-1 -2 -3')).toBe(-6))

test('+1, -1 first reaches 0 twice.', () => expect(findTheFreq('+1 -1')).toBe(0))
test('+3, +3, +4, -2, -4 first reaches 10 twice.', () => expect(findTheFreq('+3 +3 +4 -2 -4')).toBe(10))
test('-6, +3, +8, +5, -6 first reaches 5 twice.', () => expect(findTheFreq('-6 +3 +8 +5 -6')).toBe(5))
test('+7, +7, -2, -7, -4 first reaches 14 twice.', () => expect(findTheFreq('+7 +7 -2 -7 -4')).toBe(14))
