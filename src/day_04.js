import fs from 'fs'
import _ from 'lodash'

export const parseEvents = (events) => {
  const eventExpression = /^\[(?:\d*)-(?:\d*)-(?:\d*) (?:\d*):(\d*)\] (.*)$/

  let guardNumber = -1
  return events.map((event) => {
    const minuteGoneToSleep = parseInt(eventExpression.exec(event)[1])

    if (event.endsWith('begins shift')) {
      guardNumber = parseInt(/Guard #(\d*) begins shift/.exec(event)[1])
      return {
        minute: minuteGoneToSleep,
        guardId: guardNumber,
        type: 'BEGIN_SHIFT'
      }
    }

    if (event.endsWith('falls asleep')) {
      return {
        minute: minuteGoneToSleep,
        guardId: guardNumber,
        type: 'FALLS_ASLEEP'
      }
    }

    if (event.endsWith('wakes up')) {
      return {
        minute: minuteGoneToSleep,
        guardId: guardNumber,
        type: 'WAKES_UP'
      }
    }
  })
}

export const analyseGuard = (events) => {
  const sleepEvents = events.filter((e) => e.type !== 'BEGIN_SHIFT')
  const sleepPortions = _.chunk(sleepEvents, 2).map((e) =>
    [e[0].minute, e[1].minute]
  )
  const totalSleep = _.reduce(sleepPortions, (sum, p) =>
    sum + (p[1] - p[0])
  , 0)
  const frequencyOfMostSleepyMinute = _.countBy(
    _.flatten(
      _.map(sleepPortions, (p) => _.range(p[0], p[1]))))
  const mostSleepyMinute =
      _.maxBy(_.entries(frequencyOfMostSleepyMinute), '[1]')

  return {
    sleepPortions,
    totalSleep,
    mostSleepy: {
      minute: parseInt(_.head(mostSleepyMinute)),
      frequency: parseInt(_.tail(mostSleepyMinute))
    }
  }
}

const findSleepyGuardBy = (rawEvents, decidingFactor) => {
  const events = parseEvents(rawEvents)
  const eventsByGuard = _.groupBy(events, 'guardId')
  const summaryPerGuard = _.map(eventsByGuard, (guardEvents, guardId) => {
    return {
      guardId: parseInt(guardId),
      data: analyseGuard(guardEvents)
    }
  })
  const sleepyGuard = _.maxBy(summaryPerGuard, decidingFactor)
  return {
    minuteMostAsleep: sleepyGuard.data.mostSleepy.minute,
    guardId: sleepyGuard.guardId
  }
}

export const findSleepyGuard = (rawEvents) => {
  return findSleepyGuardBy(rawEvents,
    (s) => s.data.totalSleep)
}

export const findSleepestMinute = (rawEvents) => {
  return findSleepyGuardBy(rawEvents,
    (s) => s.data.mostSleepy.frequency)
}

export default () => {
  const dayFourInput = fs.readFileSync('./src/day_04.txt').toString().split('\n').sort()

  const result1 = findSleepyGuard(dayFourInput)
  console.log('4.1:', result1.guardId * result1.minuteMostAsleep)

  const result2 = findSleepestMinute(dayFourInput)
  console.log('4.2:', result2.guardId * result2.minuteMostAsleep)
}
