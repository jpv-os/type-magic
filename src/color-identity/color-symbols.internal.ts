// IMPORTANT NOTE: About the internals of this library.
//
// A color identity is composed of individual (optional) color symbols that must appear in a fixed order.
//
// This file contains two sources of truth for the implementation of the specific color symbols:
// - the type, used for compile time checks
// - the color symbols array, used for runtime checks
// Both implementations must be kept in sync, should another symbol be added!

/**
 * IMPORTANT: This is one of two sources of truth for implementing the specific color symbols that this library
 * supports. See {@link COLOR_SYMBOLS}.
 *
 * Library internal type definition of the optional color symbols in a fixed order.
 * This type should only be used for the definition of the {@link ColorIdentityString} type.
 *
 * @internal
 * @see {@link COLOR_SYMBOLS}
 * @see {@link ColorIdentityString}
 */
export type ColorSymbols = `${'w' | ''}${'u' | ''}${'b' | ''}${'r' | ''}${'g' | ''}`;

/**
 * IMPORTANT: This is one of two sources of truth for implementing the specific color symbols that this library
 * supports. See {@link ColorSymbols}.
 *
 * Library internal const definition of the optional color symbols in a fixed order.
 * This const should only be used for two purposes:
 *
 * First, to build a regular expression for runtime checks of valid color identity strings
 * (see {@link buildColorIdentityRegex}).
 *
 * Second, to build a string representing the "full" color identity, containing all possible color symbols
 * (see {@link buildFullColorIdentity}.
 *
 * @readonly
 * @internal
 * @see {@link ColorSymbols}
 * @see {@link buildColorIdentityRegex}
 * @see {@link buildFullColorIdentity}
 */
export const COLOR_SYMBOLS = ['w', 'u', 'b', 'r', 'g'] as const
