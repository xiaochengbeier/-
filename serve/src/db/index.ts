import { sequelize } from "./connection";
// 同步模型到数据库
sequelize.sync({alter:true});
export {MoveModel} from "./MoveModel"