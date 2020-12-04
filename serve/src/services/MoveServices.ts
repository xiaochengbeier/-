import { Console } from "console";
import { Op } from "sequelize";
import { MoveModel } from "../db";
import { Move } from "../entities/Moves";
import { Search } from "../entities/Search";
import { SearchByPageResult, ValidateError } from "../entities/Types";

export class MoveServices{
    /**
     * 添加move对象到数据库
     * @param move  添加的数据对象
     */
    static async addMove(move):Promise<ValidateError[]|Move>{
        // 将添加的数据转换成move对象
        const moveObj =   Move.transformPlainObjToClas(Move,move);
        // 校验数据是否齐全
        const validateResult = await  moveObj.validateThis();
        // 如果验证没有通过则返回错误信息
        if(validateResult.length){
            return validateResult;
        }
        // 如果校验通过则返回添加成功返回的move对象
        const addResult =  await MoveModel.create(moveObj);
        return  Move.transformPlainObjToClas(Move,addResult.toJSON());
    }
    /**
     * 根据id删除数据
     * @param id 数据的id
     */
    static async removeMoveById(id:number):Promise<boolean>{
     const deleteResult =  await  MoveModel.destroy({
            where:{
                id
            }
        });
      if(deleteResult === 0){
          return false;
      }
      return true;
     }
     /**
      * 根据id修改数据
      * @param id  数据id
      * @param move 需要修改的数据
      */
     static async updateMoveById(id:number,move:object):Promise<ValidateError[]|boolean>{
        //  将传入的数据对象转换成move对象
      const moveObj =   Move.transformPlainObjToClas(Move,move);
        // 校验数据准确性由于是修改不必校验每个字段仅仅校验存在的字段即可
      const validateResult = await moveObj.validateThis(true);
      if(validateResult.length){
        return validateResult;
      }
      const updateResult =  await  MoveModel.update({...moveObj},{
          where:{
              id
          }
      })
       return updateResult[0] === 0?false:true;
     }

     /**
      * 根据id查询数据
      * @param id 查询数据id
      */
     static async findById(id:number):Promise<Move|null>{
        const findResult = await   MoveModel.findByPk(id);
        if(findResult === null){
            return null;
        }
        return  Move.transformPlainObjToClas(Move,findResult.toJSON());
    }

    static async findByPage(search:object):Promise<SearchByPageResult|ValidateError[]>{
      //    首先将search转换成Search类型
      const searchObj =   Search.transformPlainObjToClas(Search,search);
      //   校验search
      const validataResult = await searchObj.validateThis();
      if(validataResult.length){
          return validataResult;
      }
      const { count, rows } =  await  MoveModel.findAndCountAll({
          where:{
            name: {
                [Op.like]: `%${searchObj.key}%`
            }
          },
          limit:searchObj.size,
          offset:(searchObj.page -1) * searchObj.size
      });
      const arr:Move[] = [];
      if(rows.length){
          rows.forEach(item=>{
           const move =  Move.transformPlainObjToClas(Move,item.toJSON());
           arr.push(move);
          })
      }
      return{
          count,
          data:arr
      }
    }
}