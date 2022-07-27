import { ColorSymbols } from '../internals/color-symbols.internal.type'

/**
 * This type represents a color identity string.
 * A color identity string is a series of optional color symbols in a fixed order.
 */
export type ColorIdentityString = string & ColorSymbols;
