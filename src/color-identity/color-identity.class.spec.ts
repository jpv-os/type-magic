import { ColorIdentity, ColorIdentityParseError } from './color-identity.class'

describe('ColorIdentity', () => {
  describe('static', () => {
    describe('constants', () => {
      test('REGEX', () => {
        expect(ColorIdentity.REGEX).toEqual(/^w?u?b?r?g?$/)
      })
      test('FULL', () => {
        expect(ColorIdentity.FULL).toEqual('wubrg')
      })
    })
    describe('isValid', () => {
      test('accepts valid color identity strings', () => {
        expect(ColorIdentity.isValid('')).toBeTruthy()
        expect(ColorIdentity.isValid('w')).toBeTruthy()
      })
      test('rejects blank input or trailing/leading spaces', () => {
        expect(ColorIdentity.isValid(' ')).toBeFalsy()
        expect(ColorIdentity.isValid('w ')).toBeFalsy()
        expect(ColorIdentity.isValid(' w')).toBeFalsy()
      })
    })
    describe('parse', () => {
      // this test suite demonstrates that the parse function relies on the isValid function
      test('invalid input throws error', () => {
        expect(() => ColorIdentity.parse('invalid input')).toThrow(ColorIdentityParseError)
      })
      test('uses isValid internally', () => {
        jest.spyOn(ColorIdentity, 'isValid').mockImplementationOnce(() => true)
        expect(() => ColorIdentity.parse('invalid input')).not.toThrow()
      })
    })
    test('add', () => {
      expect(ColorIdentity.add('wu', 'brg')).toEqual('wubrg')
      expect(ColorIdentity.add('wu', 'u')).toEqual('wu')
      expect(ColorIdentity.add('wu', 'wu')).toEqual('wu')
    })
    test('subtract', () => {
      expect(ColorIdentity.subtract('wubrg', 'wu')).toEqual('brg')
    })
    test('contains', () => {
      expect(ColorIdentity.contains('wu', 'u')).toBeTruthy()
      expect(ColorIdentity.contains('wu', 'ug')).toBeFalsy()
    })
    test('eq', () => {
      expect(ColorIdentity.eq('wubrg', 'wubrg')).toBeTruthy()
      expect(ColorIdentity.eq('', 'wubrg')).toBeFalsy()
    })
    test('neq', () => {
      expect(ColorIdentity.neq('wubrg', 'wubrg')).toBeFalsy()
      expect(ColorIdentity.neq('', 'wubrg')).toBeTruthy()
    })
    test('gt', () => {
      expect(ColorIdentity.gt('wubrg', 'wubrg')).toBeFalsy()
      expect(ColorIdentity.gt('', 'wubrg')).toBeFalsy()
      expect(ColorIdentity.gt('wubrg', '')).toBeTruthy()
      expect(ColorIdentity.gt('wu', 'rg')).toBeFalsy()
      expect(ColorIdentity.gt('wub', 'rg')).toBeTruthy()
    })
    test('gte', () => {
      expect(ColorIdentity.gte('wubrg', 'wubrg')).toBeTruthy()
      expect(ColorIdentity.gte('', 'wubrg')).toBeFalsy()
      expect(ColorIdentity.gte('wubrg', '')).toBeTruthy()
    })
    test('lt', () => {
      expect(ColorIdentity.lt('wubrg', 'wubrg')).toBeFalsy()
      expect(ColorIdentity.lt('', 'wubrg')).toBeTruthy()
      expect(ColorIdentity.lt('wubrg', '')).toBeFalsy()
    })
    test('lte', () => {
      expect(ColorIdentity.lte('wubrg', 'wubrg')).toBeTruthy()
      expect(ColorIdentity.lte('', 'wubrg')).toBeTruthy()
      expect(ColorIdentity.lte('wubrg', '')).toBeFalsy()
    })
    test('components', () => {
      expect(ColorIdentity.components('')).toEqual([''])
      expect(ColorIdentity.components('wubrg').sort()).toEqual(['', 'w', 'u', 'b', 'r', 'g'].sort())
    })
    test('permutations', () => {
      expect(ColorIdentity.subColorIdentities('').sort()).toEqual([''].sort())
      expect(ColorIdentity.subColorIdentities('w').sort()).toEqual(['', 'w'].sort())
      expect(ColorIdentity.subColorIdentities('wu').sort()).toEqual(['', 'w', 'u', 'wu'].sort())
      expect(ColorIdentity.subColorIdentities('wub').sort()).toEqual(['', 'w', 'u', 'b', 'wu', 'wb', 'ub', 'wub'].sort())
      expect(ColorIdentity.subColorIdentities('wubr').sort()).toEqual(['', 'w', 'u', 'b', 'wu', 'wb', 'ub', 'wub', 'r', 'wr', 'ur', 'br', 'wur', 'wbr', 'ubr', 'wubr'].sort())
      expect(ColorIdentity.subColorIdentities('wubrg').sort()).toEqual(['', 'w', 'u', 'b', 'wu', 'wb', 'ub', 'wub', 'r', 'wr', 'ur', 'br', 'wur', 'wbr', 'ubr', 'wubr', 'g', 'wg', 'ug', 'bg', 'wug', 'wbg', 'ubg', 'wubg', 'rg', 'wrg', 'urg', 'brg', 'wurg', 'wbrg', 'ubrg', 'wubrg'].sort())
      expect(ColorIdentity.subColorIdentities(ColorIdentity.FULL)).toHaveLength(32)
    })
  })

  describe('instance', () => {
    describe('add', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'add')
        ColorIdentity.parse('').add('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
      test('accepts color identity objects or color identity strings', () => {
        const result = ColorIdentity
          .parse('')
          .add('w')
          .add(ColorIdentity.parse('u'))
          .value()
        expect(result).toEqual('wu')
      })
    })
    describe('subtract', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'subtract')
        ColorIdentity.parse('').subtract('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('contains', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'contains')
        ColorIdentity.parse('').contains('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('eq', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'eq')
        ColorIdentity.parse('').eq('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('neq', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'neq')
        ColorIdentity.parse('').neq('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('gt', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'gt')
        ColorIdentity.parse('').gt('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('gte', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'gte')
        ColorIdentity.parse('').gte('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('lt', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'lt')
        ColorIdentity.parse('').lt('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('lte', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'lte')
        ColorIdentity.parse('').lte('')
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('components', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'components')
        ColorIdentity.parse('').components()
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    describe('subColorIdentities', () => {
      test('uses static function internally', () => {
        const spy = jest.spyOn(ColorIdentity, 'subColorIdentities')
        ColorIdentity.parse('').subColorIdentities()
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
    test('value', () => {
      expect(ColorIdentity.parse('').value()).toEqual('')
      expect(ColorIdentity.parse('wubrg').value()).toEqual('wubrg')
    })
  })
})
