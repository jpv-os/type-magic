import { COLOR_SYMBOLS } from '../internals/color-symbols.internal.const'
import { ColorIdentityString } from '../color-identity-string/color-identity-string.type'

/**
 * An error representing that an input string could not be parsed as a valid color identity string.
 */
export class ColorIdentityParseError extends Error {}

/**
 * Represents a color identity and has a state. The member functions can be used to modify the current state of a
 * ColorIdentity. Use the static functions to perform color identity string operations without creating instances
 * of the class.
 */
export class ColorIdentity {
  /**
   * The regular expression to verify color identity strings.
   */
  static readonly REGEX: RegExp = this.buildColorIdentityRegex()

  /**
   * The full color identity contains all possible color symbols.
   */
  static readonly FULL: ColorIdentityString = this.buildFullColorIdentity()

  /**
   * The internal state of a {@link ColorIdentity} object.
   *
   * @private
   */
  private state: ColorIdentityString

  /**
   * Creates a new {@link ColorIdentity} with either an empty color identity string or a given string as initial state.
   *
   * @param {ColorIdentityString | undefined} initialState - The initial state.
   */
  constructor (initialState: ColorIdentityString) {
    this.state = initialState
  }

  /**
   * Type guard function that can be used to validate any string input.
   *
   * @param {string} str - Any string input.
   * @returns {str is ColorIdentityString} True if the input is a valid color identity string.
   */
  static isValid (str: string): str is ColorIdentityString {
    return this.REGEX.test(str)
  }

  /**
   * Accepts a string input, parses it and returns a {@link ColorIdentity} if successful.
   * Otherwise, throw a {@link ColorIdentityParseError}.
   *
   * @param {string} str - The input to parse.
   * @throws {ColorIdentityParseError} If the input is not a string with valid color identity format.
   * @returns {ColorIdentity} An instance of {@link ColorIdentity} representing the input string.
   */
  static parse (str: string): ColorIdentity {
    if (!this.isValid(str)) {
      throw new ColorIdentityParseError(`Not a valid ColorIdentityString: "${str}"`)
    }
    return new ColorIdentity(str)
  }

  /**
   * Adds two color identity strings and returns a new string as a result.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} add - The input to be added to base.
   * @returns {ColorIdentityString} The result of the addition.
   */
  static add (base: ColorIdentityString, add: ColorIdentityString): ColorIdentityString {
    return this.FULL
      .split('')
      .filter(c => base.indexOf(c) >= 0 || add.indexOf(c) >= 0)
      .join('') as ColorIdentityString
  }

  /**
   * Subtracts two color identity strings and returns a new string as a result.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} subtract - The input to be subtracted from base.
   * @returns {ColorIdentityString} The result of the subtraction.
   */
  static subtract (base: ColorIdentityString, subtract: ColorIdentityString): ColorIdentityString {
    const subtractSymbols = subtract.split('')
    return base
      .split('')
      .filter(c => subtractSymbols.indexOf(c) < 0)
      .join('') as ColorIdentityString
  }

  /**
   * Returns true if the given base color identity contains all colors of the given search color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} search - The color identity to search for in base.
   * @returns {boolean} True if base contains search.
   */
  static contains (base: ColorIdentityString, search: ColorIdentityString): boolean {
    return search
      .split('')
      .reduce((success, color) => success && base.indexOf(color) >= 0, true)
  }

  /**
   * Returns true if the given base color identity equals the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base equals other.
   */
  static eq (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return base === other
  }

  /**
   * Returns true if the given base color identity does not equal the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base does not equal other.
   */
  static neq (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return !this.eq(base, other)
  }

  /**
   * Returns true if the given base color identity is greater than the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base is greater than the other.
   */
  static gt (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return base.length > other.length
  }

  /**
   * Returns true if the given base color identity is greater than or equal to the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base is greater than or equal to the other.
   */
  static gte (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return this.gt(base, other) || this.eq(base, other)
  }

  /**
   * Returns true if the given base color identity is less than the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base is less than the other.
   */
  static lt (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return this.gt(other, base)
  }

  /**
   * Returns true if the given base color identity is less than or equal to the other color identity.
   *
   * @param {ColorIdentityString} base - The base input.
   * @param {ColorIdentityString} other - The color identity to compare base with.
   * @returns {boolean} True if base is less than or equal to the other.
   */
  static lte (base: ColorIdentityString, other: ColorIdentityString): boolean {
    return this.gte(other, base)
  }

  /**
   * Returns all components of a given color identity, including the empty color identity.
   * Components are color identity strings that only contain up to a single symbol.
   *
   * @param {ColorIdentityString} base - The input to extract components from.
   * @returns {ColorIdentityString[]} The components of the input.
   */
  static components (base: ColorIdentityString): ColorIdentityString[] {
    return ['', ...base.split('') as ColorIdentityString[]]
  }

  /**
   * Returns all possible sub color identities using the given color identities' components.
   *
   * @param {ColorIdentityString} base - The input to build permutations from.
   * @returns {ColorIdentityString[]} All sub color identities of the inputs' components.
   */
  static subColorIdentities (base: ColorIdentityString): ColorIdentityString[] {
    return base
      .split('')
      .reduce(
        (result, component) => [
          ...result,
          ...result.map(r => `${r}${component}` as ColorIdentityString)
        ],
        ['' as ColorIdentityString]
      )
      .sort()
  }

  /**
   * Helper function to create the color identity regex from the internal configuration value for {@link COLOR_SYMBOLS}.
   *
   * @private
   * @returns {RegExp}
   * The regular expression to test for valid color identity strings,
   * based on the {@link COLOR_SYMBOLS} configuration.
   * @see {@link COLOR_SYMBOLS}
   */
  private static buildColorIdentityRegex (): RegExp {
    return new RegExp(`^${COLOR_SYMBOLS.map(s => `${s}?`).join('')}$`)
  }

  /**
   * Helper function to create the color identity string representing the "full" color identity (= containing all
   * possible color symbols) from the internal configuration t for {@link COLOR_SYMBOLS}.
   *
   * @private
   * @returns {ColorIdentityString} A color identity string holding the full color identity.
   * @see {@link COLOR_SYMBOLS}
   */
  private static buildFullColorIdentity (): ColorIdentityString {
    return COLOR_SYMBOLS.join('') as ColorIdentityString
  }

  /**
   * Helper function to read the internal state (color identity string representation) of either a {@link ColorIdentity}
   * object of {@link ColorIdentityString}, whichever is passed to this function. This is used for convenience when
   * accepting both the class and string type as arguments for the API of this library.
   *
   * @param {ColorIdentity | ColorIdentityString} ci - A color identity instance or string.
   * @returns {ColorIdentityString} The string value of the given input.
   * @private
   */
  private static getState (ci: ColorIdentity | ColorIdentityString): ColorIdentityString {
    return ci instanceof ColorIdentity
      ? ci.state
      : ci
  }

  /**
   * Adds another color identity to this instance.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {ColorIdentity} This instance after modification.
   */
  add (other: ColorIdentity | ColorIdentityString): ColorIdentity {
    this.state = ColorIdentity.add(this.state, ColorIdentity.getState(other))
    return this
  }

  /**
   * Subtracts another color identity from this instance.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {ColorIdentity} This instance after modification.
   */
  subtract (other: ColorIdentity | ColorIdentityString): ColorIdentity {
    this.state = ColorIdentity.subtract(this.state, ColorIdentity.getState(other))
    return this
  }

  /**
   * Checks if this instance contains another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this instance contains another color identity.
   */
  contains (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.contains(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is equal to the other.
   */
  eq (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.eq(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is not equal to the other.
   */
  neq (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.neq(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is greater than the other.
   */
  gt (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.gt(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is greater than or equal to the other.
   */
  gte (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.gte(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is less than the other.
   */
  lt (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.lt(this.state, ColorIdentity.getState(other))
  }

  /**
   * Compares this instance to another color identity.
   *
   * @param {ColorIdentity | ColorIdentityString} other - The other color identity.
   * @returns {boolean} True, if this is less than or equal to the other.
   */
  lte (other: ColorIdentity | ColorIdentityString): boolean {
    return ColorIdentity.lte(this.state, ColorIdentity.getState(other))
  }

  /**
   * Returns the components of this instance.
   *
   * @returns {ColorIdentityString[]} The components of this instance.
   * @see {@link ColorIdentity.components}
   */
  components (): ColorIdentityString[] {
    return ColorIdentity.components(this.state)
  }

  /**
   * Returns the sub color identities of this instance.
   *
   * @returns {ColorIdentityString[]} The sub color identities of this instance.
   * @see {@link ColorIdentity.subColorIdentities}
   */
  subColorIdentities (): ColorIdentityString[] {
    return ColorIdentity.subColorIdentities(this.state)
  }

  /**
   * Returns the string representation of this {@link ColorIdentity} instance.
   *
   * @returns {ColorIdentityString} Representation of this instance.
   */
  value (): ColorIdentityString {
    return this.state
  }
}
