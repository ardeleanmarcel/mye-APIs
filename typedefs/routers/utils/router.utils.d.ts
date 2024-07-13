import { z } from 'zod';
type FilterSchemaConfig = {
    [x: string]: 'string' | 'number';
};
export declare function createInputSchema(cfg: FilterSchemaConfig): z.ZodEffects<z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["IN"]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodArray<z.ZodNumber, "many">, z.ZodArray<z.ZodString, "many">]>;
}, "strict", z.ZodTypeAny, {
    type: "IN";
    name: string;
    value: string | number | string[] | number[];
}, {
    type: "IN";
    name: string;
    value: string | number | string[] | number[];
}>, "many">, {
    type: "IN";
    name: string;
    value: string | number | string[] | number[];
}[], {
    type: "IN";
    name: string;
    value: string | number | string[] | number[];
}[]>;
export {};
