import { DataTypes, ModelDefined, Optional } from "sequelize";
import { Move } from "../entities/Moves";
import { sequelize } from "./connection";
interface NoteCreationAttributes extends Optional< Move, "validateThis" |"description"|"poster"> {};
const MoveModel:  ModelDefined<Move,NoteCreationAttributes> = sequelize.define("MoveModel",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    types:{
        type:DataTypes.STRING,
        allowNull:false
    },
    areas:{
        type:DataTypes.STRING,
        allowNull:false
    },
    timeLog:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    isClassic:{
        type: DataTypes.ENUM,
        values: ["true","false"]
    },
    isHot:{
        type: DataTypes.ENUM,
        values: ["true","false"]
    },
    description:{
        type:DataTypes.STRING,
    },
    poster:{
        type:DataTypes.STRING,
    }
},{
    tableName:"movetable",
    paranoid:true,
    deletedAt:true,
    updatedAt:true
});
export {MoveModel};
