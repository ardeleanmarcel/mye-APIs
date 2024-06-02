export const FILTER_TYPE = {
  In: 'IN',
} as const;

export type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE];

export type FilterValue = string | number | (string | number)[];

export interface Filter {
  name: string;
  type: FilterType;
  value: FilterValue;
}

export interface ArrayFilter extends Filter {
  value: (string | number)[];
}
