import { ColorIdentity, ColorIdentityParseError } from './color-identity.class'
import { ColorIdentityString } from './color-identity-string.type'

/**
 * Parses a color identity string.
 *
 * @param {ColorIdentityString | TemplateStringsArray} input - The input to be parsed.
 * @throws {ColorIdentityParseError} If the input could not be parsed successfully.
 * @returns {ColorIdentity} The parsed color identity.
 */
export function cid (input: ColorIdentityString | TemplateStringsArray): ColorIdentity {
  const isTemplateArray = Array.isArray(input)
  const raw = isTemplateArray ? (input as TemplateStringsArray).join('') : input as ColorIdentityString
  return ColorIdentity.parse(raw)
}
