import {Sequelize} from "sequelize";
const sequelize = new Sequelize("move","root","root",{
    host:"localhost",
    dialect:"mysql",
    logging:false
});
export {sequelize};