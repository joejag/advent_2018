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
  const mostSleepyMinute = parseInt(
    _.head(
      _.maxBy(
        _.entries(frequencyOfMostSleepyMinute), '[1]')))

  return { sleepPortions, totalSleep, mostSleepyMinute }
}

export const findSleepyGuard = (rawEvents) => {
  const events = parseEvents(rawEvents)
  const eventsByGuard = _.groupBy(events, 'guardId')
  const summaryPerGuard = _.map(eventsByGuard, (guardEvents, guardId) => {
    return {
      guardId: parseInt(guardId),
      data: analyseGuard(guardEvents)
    }
  })
  const sleepyGuard = _.maxBy(summaryPerGuard,
    (s) => s.data.totalSleep)
  return {
    minuteToGo: sleepyGuard.data.mostSleepyMinute,
    guardId: sleepyGuard.guardId
  }
}

export const magicNumber = (rawEvents) => {
  const result = findSleepyGuard(rawEvents)
  return result.guardId * result.minuteToGo
}

export default () => {
  const dayFourInput = fs.readFileSync('./src/day_04.txt').toString().split('\n').sort()
  console.log('4.1:', magicNumber(dayFourInput))
}
