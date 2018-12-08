import { letterOccurs, checkSum } from './day_two'

it('checksums', () => {
  expect(checkSum('abcdef bababc abbcde abcccd aabcdd abcdee ababab')).toBe(12)
})

it('abcdef contains no letters that appear exactly two or three times.', () => {
  expect(letterOccurs('abcdef', 2)).toBe(false)
  expect(letterOccurs('abcdef', 3)).toBe(false)
})
it('bababc contains two a and three b, so it counts for both.', () => {
  expect(letterOccurs('bababc', 2)).toBe(true)
  expect(letterOccurs('bababc', 3)).toBe(true)
})
it('abbcde contains two b, but no letter appears exactly three times.', () => {
  expect(letterOccurs('abbcde', 2)).toBe(true)
  expect(letterOccurs('abbcde', 3)).toBe(false)
})
it('abcccd contains three c, but no letter appears exactly two times.', () => {
  expect(letterOccurs('abcccd', 2)).toBe(false)
  expect(letterOccurs('abcccd', 3)).toBe(true)
})
it('aabcdd contains two a and two d, but it only counts once.', () => {
  expect(letterOccurs('aabcdd', 2)).toBe(true)
  expect(letterOccurs('aabcdd', 3)).toBe(false)
})
it('abcdee contains two e.', () => {
  expect(letterOccurs('abcdee', 2)).toBe(true)
  expect(letterOccurs('abcdee', 3)).toBe(false)
})
it('ababab contains three a and three b, but it only counts once.', () => {
  expect(letterOccurs('ababab', 2)).toBe(false)
  expect(letterOccurs('ababab', 3)).toBe(true)
})
