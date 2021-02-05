// This file should be only TypeScript type helpers.

import { TypeOfTag } from "typescript";
/** Takes a typeof value and gives back the TS type. */
export type TypeOfType<T extends TypeOfTag> = T extends "never"
    ? never
    : T extends "undefined"
    ? undefined
    : T extends "number"
    ? number
    : T extends "bigint"
    ? bigint
    : T extends "boolean"
    ? boolean
    : T extends "string"
    ? string
    : T extends "symbol"
    ? symbol
    : T extends "object"
    ? Record<string, unknown>
    : T extends "function"
    ? () => unknown
    : never;
