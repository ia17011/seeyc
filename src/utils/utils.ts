// make nullableIterable to nonNullableIterable
export function notNull<T>(item: T | null): item is T {
  return item !== null
}
