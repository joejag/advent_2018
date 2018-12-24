import _ from 'lodash'
import { LinkedList, nextTurn, playMarbles } from './day_09'

const linky = (array, current) => {
  const list = new LinkedList(_.head(array))
  _.each(_.tail(array), (x) => list.insert(x))
  while (list.current.value !== current) {
    list.moveClockwise()
  }
  return list
}

it('knows the next turn', () => {
  expect(nextTurn({ turn: 0, players: 9, player: null, current: 0, marbles: linky([0], 0) })
    .marbles.toArray()).toEqual([0, 1])
  expect(nextTurn({ turn: 0, players: 9, player: null, current: 0, marbles: linky([0], 0) })
    .current).toEqual(1)
  expect(nextTurn({ turn: 1, players: 9, player: 1, current: 1, marbles: linky([0, 1], 1) })
    .marbles.toArray()).toEqual([0, 2, 1])
  expect(nextTurn({ turn: 2, players: 9, player: 2, current: 2, marbles: linky([0, 2, 1], 2) })
    .marbles.toArray()).toEqual([0, 2, 1, 3])
  expect(nextTurn({ turn: 3, players: 9, player: 3, current: 3, marbles: linky([0, 2, 1, 3], 3) })
    .marbles.toArray()).toEqual([0, 4, 2, 1, 3])
  expect(nextTurn({ turn: 7, players: 9, player: 7, current: 7, marbles: linky([0, 4, 2, 5, 1, 6, 3, 7], 7) })
    .marbles.toArray()).toEqual([0, 8, 4, 2, 5, 1, 6, 3, 7])
})

it('rotates players', () => {
  expect(nextTurn({ turn: 9, players: 9, player: 9, current: 9, scoreEvents: [], marbles: linky([0, 8, 4, 9, 2, 5, 1, 6, 3, 7], 9) })
    .player).toEqual(1)
  expect(nextTurn({ turn: 18, players: 9, player: 9, current: 18, scoreEvents: [], marbles: linky([0, 16, 8, 17, 4, 18, 9, 2, 10, 5, 11, 1, 12, 6, 13, 3, 14, 7, 15], 18) })
    .player).toEqual(1)
})

describe('handles 23 as a special case', () => {
  it('current moves seven places left', () => {
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .current).toEqual(19)
  })
  it('next turn is 24', () => {
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .turn).toEqual(23)
  })
  it('marble 23 is not added and one seven places left gets taken', () => {
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .marbles.toArray()).toEqual([0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15])
  })
  it('handles scoring on 23', () => {
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .scoreEvents).toEqual([{ player: 5, keeps: [9, 23] }])
  })
  it('can handle negative indexes', () => {
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 22, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 8, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .marbles.toArray()).toEqual([0, 16, 22, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 8, 11, 1, 12, 6, 3, 14, 7, 15])
    expect(nextTurn({ turn: 22, players: 9, player: 4, current: 22, scoreEvents: [], marbles: linky([0, 16, 22, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 8, 11, 1, 12, 6, 13, 3, 14, 7, 15], 22) })
      .current).toEqual(3)
  })

  it('handles the one after 23 well', () => {
    expect(nextTurn({ turn: 23, player: 5, players: 9, current: 19, scoreEvents: [{ keeps: [9, 23], player: 4 }], marbles: linky([0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15], 19) })
      .marbles.toArray()).toEqual([0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15])
  })
})

it('plays the game and calculates a high score', () => {
  // expect(playMarbles({ players: 10, turns: 24 })).toEqual(['10', 8317])
  expect(playMarbles({ players: 10, turns: 1618 })).toEqual(['10', 8317])
  expect(playMarbles({ players: 13, turns: 7999 })).toEqual(['12', 146373])
})

it('can play the first few rounds', () => {
  const result = nextTurn(nextTurn(nextTurn({ turn: 0, players: 9, player: null, current: 0, marbles: new LinkedList(0) })))
  expect(result.marbles.toArray()).toEqual([0, 2, 1, 3])
})

describe('LinkedList', () => {
  it('can loop around', () => {
    const list = new LinkedList(0)
    list.insert(10)
    list.insert(20)
    expect(list.current.value).toBe(20)
    expect(list.current.next.value).toBe(0)
    expect(list.current.prev.value).toBe(10)
    expect(list.current.prev.prev.value).toBe(0)
  })
  it('can be moved forward', () => {
    const list = new LinkedList(1)
    list.insert(2)
    list.insert(3)
    list.insert(4)
    list.insert(5)
    list.moveClockwise()
    list.moveClockwise()
    expect(list.current.value).toBe(2)
  })
  it('can move backward', () => {
    const list = new LinkedList(1)
    list.insert(2)
    list.insert(3)
    list.insert(4)
    list.insert(5)
    list.moveAntiClockwise()
    expect(list.current.value).toBe(4)
  })
  it('can remove nodes', () => {
    const list = new LinkedList(1)
    list.insert(2)
    list.insert(3)
    list.insert(4)
    list.insert(5)
    expect(list.remove()).toBe(5)
    expect(list.current.value).toBe(1)
    list.moveAntiClockwise()
    expect(list.current.value).toBe(4)
  })
  it('can convert to array', () => {
    const list = new LinkedList(1)
    list.insert(2)
    list.insert(3)
    list.insert(4)
    list.insert(5)
    expect(list.toArray()).toEqual([1, 2, 3, 4, 5])
  })
  it('handles losing its head', () => {
    const list = new LinkedList(1)
    list.insert(2)
    list.insert(3)
    list.moveClockwise()
    expect(list.head.value).toEqual(1)
    expect(list.remove()).toEqual(1)
    expect(list.head.value).toEqual(2)
  })
})
