import { Move } from "./Moves";
export declare type ValidateError = {
    property: string;
    constraints: object;
};
export declare type SearchByPageResult = {
    count: number;
    data: Move[];
};
