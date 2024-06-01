export const FILTER_TYPE = {
  In: 'IN',
} as const;

export type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE];

export type Filter<T> = {
  name: T;
  type: FilterType;
};


