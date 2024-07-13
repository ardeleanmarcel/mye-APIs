import { Filter, FilterValue } from '../../db.utils';
export declare function composeWhereClause(filters: Filter<string>[]): {
    whereClauses: string;
    bindings: FilterValue[];
};
