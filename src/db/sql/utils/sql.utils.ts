import { ArrayFilter, FILTER_TYPE, Filter, FilterValue } from '../../db.utils';

export function composeWhereClause(filters: Filter[]) {
  let whereClauses = '';
  let bindings: FilterValue[] = [];
  if (filters.length > 0) whereClauses += 'WHERE\n';

  function isArrayFilter(filter: Filter): filter is ArrayFilter {
    return filter.type === FILTER_TYPE.In;
  }

  filters.map((f) => {
    if (isArrayFilter(f)) {
      whereClauses += `${f.name} IN ( ${f.value.map(() => ' ? ').join(',')} )`;
      bindings = [...bindings, ...f.value];
    }
  });

  return { whereClauses, bindings };
}
