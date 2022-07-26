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
