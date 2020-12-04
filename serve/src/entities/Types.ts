import { Move } from "./Moves"

export type ValidateError ={
    property:string,
    constraints:object
}
export type SearchByPageResult={
    count:number,
    data:Move[]
}