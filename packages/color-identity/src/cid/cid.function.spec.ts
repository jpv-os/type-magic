import { cid } from './cid.function'
import { ColorIdentity } from '../color-identity/color-identity.class'

describe('cid', () => {
  test('template syntax compiles and function creates an instance of ColorIdentity', () => {
    expect(cid``).toEqual(ColorIdentity.parse(''))
    expect(cid`wubrg`).toEqual(ColorIdentity.parse('wubrg'))
    expect(cid`w${'ub'}rg`).toEqual(ColorIdentity.parse('wubrg'))
  })
})
