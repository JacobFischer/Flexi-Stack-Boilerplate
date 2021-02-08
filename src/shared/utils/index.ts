import { TypeOfTag } from 'typescript';
import { TypeOfType } from './types';

/**
 * Tests if a given value is an Object (and not null), as a type-safe way to
 * check for not null and an object, as opposed to `typeof`.
 *
 * @param obj - The objet to test.
 * @returns - True if actually an object, false otherwise.
 */
export function isObject<T>(obj: T): obj is T & Record<PropertyKey, unknown> {
  return typeof obj === 'object' && obj !== null;
}

/**
 * Checks if an object has a given property/key inside it, with an optional
 * type to check too.
 *
 * @param obj - The object to inspect.
 * @param key - The key to check within the object.
 * @param keyType - Optional typeof value to check against too.
 * @returns True if the key is present of the expected type, false otherwise.
 */
export function isKeyIn<
  TObj extends {}, // eslint-disable-line @typescript-eslint/ban-types
  TKey extends PropertyKey,
  // TODO: flesh out via typeof or grab
  TKeyType extends undefined | TypeOfTag = undefined
>(
  obj: TObj,
  key: TKey,
  keyType?: TKeyType,
): obj is TObj &
  Record<TKey, TKeyType extends string ? TypeOfType<TKeyType> : unknown> {
  const exists = key in obj;

  if (!keyType || !exists) {
    return exists;
  }

  const record = (obj as unknown) as Record<TKey, unknown>;
  return typeof record[key] === keyType;
}
