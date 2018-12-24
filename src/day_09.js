import _ from 'lodash'

const calculateNextPlayer = ({ player, players }) => {
  if (player === players) {
    return 1
  }
  return player + 1
}

const calculateNormalMarbleProgression = ({ turn, marbles, scoreEvents }) => {
  const nextMarble = turn + 1
  marbles.moveClockwise()
  marbles.insert(nextMarble)
  return {
    current: nextMarble,
    scoreEvents: scoreEvents,
    marbles: marbles }
}

const calculateTheTwentyThreesMarbleProgression = ({ turn, marbles, player, scoreEvents }) => {
  _.times(7, () => marbles.moveAntiClockwise())
  const removedMarble = marbles.remove()
  const nextMarble = marbles.current.value
  scoreEvents.push({ player: player + 1, keeps: [removedMarble, turn + 1] })
  return {
    current: nextMarble,
    scoreEvents,
    marbles }
}

export const nextTurn = (previousTurn) => {
  const nextPlayer = calculateNextPlayer(previousTurn)

  let nextMarbles
  if ((previousTurn.turn + 1) % 23 === 0) {
    nextMarbles = calculateTheTwentyThreesMarbleProgression(previousTurn)
  } else {
    nextMarbles = calculateNormalMarbleProgression(previousTurn)
  }

  return {
    turn: previousTurn.turn + 1,
    players: previousTurn.players,
    player: nextPlayer,
    ...nextMarbles }
}

export const playMarbles = ({ players, turns }) => {
  let previousGame = { turn: 0, players, player: null, scoreEvents: [], current: 0, marbles: new LinkedList(0) }
  let turnsLeft = turns

  while (turnsLeft > 0) {
    previousGame = nextTurn(previousGame)
    turnsLeft = turnsLeft - 1
  }

  const scoresByPlayer = _.toPairs(_.groupBy(previousGame.scoreEvents, 'player'))
  const scoresByPlayerAdded = _.map(scoresByPlayer, (s) => [_.head(s), _.sum(_.flattenDeep(_.map(_.tail(s), (k) => _.map(k, (x) => x.keeps))))])
  return _.maxBy(scoresByPlayerAdded, '[1]')
}

export default () => {
  console.log('8.1', playMarbles({ players: 413, turns: 71082 }))
  console.log('8.2', playMarbles({ players: 413, turns: 71082 * 100 }))
}

export class LinkedList {
  constructor (value) {
    this.current = new Node(value, null, null)
    this.current.next = this.current
    this.current.prev = this.current
    this.head = this.current
  }

  insert (value) {
    const newNode = new Node(value, this.current.next, this.current)
    this.current.next.prev = newNode
    this.current.next = newNode
    this.current = newNode
    if (this.current.next.value === this.head.value) {
      this.head.prev = this.current
    }
  }

  remove () {
    if (this.current.value === this.head.value) {
      this.head = this.head.next
    }

    const oldNext = this.current.next
    const oldPrev = this.current.prev
    oldNext.prev = oldPrev
    oldPrev.next = oldNext

    const oldValue = this.current.value
    this.current = this.current.next
    return oldValue
  }

  moveClockwise () {
    this.current = this.current.next
  }

  moveAntiClockwise () {
    this.current = this.current.prev
  }

  toArray () {
    const goBackHere = this.current
    while (this.current !== this.head) {
      this.moveClockwise()
    }

    const result = [this.current.value]
    this.moveClockwise()

    while (this.current !== this.head) {
      result.push(this.current.value)
      this.moveClockwise()
    }

    while (this.current !== goBackHere) {
      this.moveClockwise()
    }

    return result
  }
}

class Node {
  constructor (value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}
