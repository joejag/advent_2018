import _ from 'lodash'

const calculateNextPlayer = ({ player, players }) => {
  if (player === players) {
    return 1
  }
  return player + 1
}

const calculateWhereNextMarbleInsertionWillBe = (marbles, current) => {
  const indexOfCurrent = _.indexOf(marbles, current)
  if (indexOfCurrent === marbles.length - 1) {
    return 1
  }
  return indexOfCurrent + 2
}

const calculateNormalMarbleProgression = ({ turn, current, marbles, scoreEvents }) => {
  const nextMarble = turn + 1
  marbles.splice(calculateWhereNextMarbleInsertionWillBe(marbles, current), 0, nextMarble)
  return {
    current: nextMarble,
    scoreEvents: scoreEvents,
    marbles: marbles }
}

const calculateTheTwentyThreesMarbleProgression = ({ turn, marbles, current, player, scoreEvents }) => {
  const indexOfCurrent = _.indexOf(marbles, current)
  const nextMarble = _.nth(marbles, indexOfCurrent - 6)
  const removedMarble = _.head(marbles.splice(indexOfCurrent - 7, 1))
  scoreEvents.push({ player: player + 1, keeps: [removedMarble, turn + 1] })
  return {
    current: nextMarble,
    scoreEvents,
    marbles }
}

export const nextTurn = (previousTurn) => {
  const nextPlayer = calculateNextPlayer(previousTurn)

  let nextMarbles
  if ((previousTurn.current + 1) % 23 === 0) {
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
  let previousGame = { turn: 0, players, player: null, scoreEvents: [], current: 0, marbles: [0] }
  let turnsLeft = turns
  while (turnsLeft > 0) {
    if (turnsLeft % 1000 === 0) {
      // console.log('turn', turnsLeft)
    }
    previousGame = nextTurn(previousGame)
    turnsLeft = turnsLeft - 1
  }

  const scoresByPlayer = _.toPairs(_.groupBy(previousGame.scoreEvents, 'player'))
  const scoresByPlayerAdded = _.map(scoresByPlayer, (s) => [_.head(s), _.sum(_.flattenDeep(_.map(_.tail(s), (k) => _.map(k, (x) => x.keeps))))])
  return _.maxBy(scoresByPlayerAdded, '[1]')
}

export default () => {
  console.log('8.1', playMarbles({ players: 413, turns: 71082 }))
}
