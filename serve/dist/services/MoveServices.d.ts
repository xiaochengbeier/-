import { Move } from "../entities/Moves";
import { SearchByPageResult, ValidateError } from "../entities/Types";
export declare class MoveServices {
    /**
     * 添加move对象到数据库
     * @param move  添加的数据对象
     */
    static addMove(move: any): Promise<ValidateError[] | Move>;
    /**
     * 根据id删除数据
     * @param id 数据的id
     */
    static removeMoveById(id: number): Promise<boolean>;
    /**
     * 根据id修改数据
     * @param id  数据id
     * @param move 需要修改的数据
     */
    static updateMoveById(id: number, move: object): Promise<ValidateError[] | boolean>;
    /**
     * 根据id查询数据
     * @param id 查询数据id
     */
    static findById(id: number): Promise<Move | null>;
    static findByPage(search: object): Promise<SearchByPageResult | ValidateError[]>;
}
