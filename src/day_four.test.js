import { analyseGuard, parseEvents, findSleepyGuard } from './day_four'

const exampleInput = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up'
]

it('can parse being shift events', () => {
  expect(parseEvents(exampleInput)[0]).toEqual({
    minute: 0, guardId: 10, type: 'BEGIN_SHIFT'
  })
})

it('can parse being falls asleep events', () => {
  expect(parseEvents(exampleInput)[1]).toEqual({
    minute: 5, guardId: 10, type: 'FALLS_ASLEEP'
  })
})

it('can parse being waking up events', () => {
  expect(parseEvents(exampleInput)[2]).toEqual({
    minute: 25, guardId: 10, type: 'WAKES_UP'
  })
})

it('new guard falls asleep', () => {
  expect(parseEvents(exampleInput)[6]).toEqual({
    minute: 40, guardId: 99, type: 'FALLS_ASLEEP'
  })
})

it('analyse a single guards data', () => {
  expect(analyseGuard([
    { minute: 0, guardId: 10, type: 'BEGIN_SHIFT' },
    { minute: 10, guardId: 10, type: 'FALLS_ASLEEP' },
    { minute: 19, guardId: 10, type: 'WAKES_UP' },
    { minute: 0, guardId: 10, type: 'BEGIN_SHIFT' },
    { minute: 18, guardId: 10, type: 'FALLS_ASLEEP' },
    { minute: 30, guardId: 10, type: 'WAKES_UP' }]))
    .toEqual({
      sleepPortions: [[10, 19], [18, 30]],
      totalSleep: 21,
      mostSleepyMinute: 18
    })
})

it('should find the most sleepy guard', () => {
  expect(findSleepyGuard([
    '[1518-11-01 00:00] Guard #2 begins shift',
    '[1518-11-01 00:58] falls asleep',
    '[1518-11-01 00:59] wakes up',
    '[1518-11-02 00:00] Guard #10 begins shift',
    '[1518-11-02 00:10] falls asleep',
    '[1518-11-02 00:20] wakes up',
    '[1518-11-02 00:19] falls asleep',
    '[1518-11-02 00:30] wakes up'])).toEqual({
    minuteToGo: 19, guardId: 10
  })
})

it('should find the most sleepy guard from examples', () => {
  expect(findSleepyGuard(exampleInput)).toEqual({
    minuteToGo: 24, guardId: 10
  })
})
