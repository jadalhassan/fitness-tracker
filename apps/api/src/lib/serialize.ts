export function serialize<T extends { _id?: unknown; id?: string }>(value: T) {
  const source =
    typeof (value as { toObject?: () => unknown }).toObject === "function"
      ? ((value as { toObject: () => T }).toObject() as T & {
          __v?: number;
        })
      : ({ ...(value as T), __v: undefined } as T & { __v?: number });

  const { _id, __v, ...rest } = source as T & { __v?: number };
  void __v;

  return {
    id: String((rest as { id?: string }).id ?? _id ?? ""),
    ...rest
  };
}

export function serializeList<T extends { _id?: unknown; id?: string }>(
  values: T[]
) {
  return values.map((value) => serialize(value));
}
