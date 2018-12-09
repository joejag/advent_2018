import { alchemicalReduction } from './day_05'

it('aA dies', () => { expect(alchemicalReduction('aA')).toEqual('') })
it('collides', () => { expect(alchemicalReduction('abBA')).toEqual('') })
it('does nothing 1', () => { expect(alchemicalReduction('abAB')).toEqual('abAB') })
it('does nothing 2', () => { expect(alchemicalReduction('aabAAB')).toEqual('aabAAB') })
it('works bigger', () => { expect(alchemicalReduction('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA') })
