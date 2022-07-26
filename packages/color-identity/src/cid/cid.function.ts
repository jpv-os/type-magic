import { ColorIdentity, ColorIdentityParseError } from '../color-identity/color-identity.class'

/**
 * Parses a color identity string.
 *
 * @param {TemplateStringsArray} templates - The template input to be parsed.
 * @param {...unknown[]} args - The template interpolation arguments.
 * @throws {ColorIdentityParseError} If the input could not be parsed successfully.
 * @returns {ColorIdentity} The parsed color identity.
 * @example
 * const myInterpolationValue = "ub"
 * const myColorIdentity = cid`w${myInterpolationValue}rg`
 * console.log(myColorIdentity.value()) // prints "wubrg"
 * console.log(cid`invalid input`) // throws ColorIdentityParseError
 */
export function cid (templates: TemplateStringsArray, ...args: unknown[]): ColorIdentity {
  const joinedTemplatesWithInterpolation = templates
    .map((part, index) => `${part}${args[index] ?? ''}`)
    .join('')
  return ColorIdentity.parse(joinedTemplatesWithInterpolation)
}
