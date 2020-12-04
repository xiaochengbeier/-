import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { MoveModel } from "./db";
import { Move } from "./entities/Moves";
import { MoveServices } from "./services/MoveServices";
const areas :string[] = ["中国","蒙古","朝鲜","韩国","日本","律宾","越南","老挝","埔寨","缅甸","泰国","马来西"];
const types:string[] =["爱情电影","警匪电影","科幻电影","战争电影","灾难电影","温情电影","史诗电影","实验电影"];
const names:string[] =["《功夫瑜伽》","《非诚勿扰》","《乘风破浪》","《非常完美》","《英雄本色》","《海角七号》","《东邪西毒》","《勇敢的心》"];
const isTrue:string[] = ["true","false","true","false"];
function random(max,min){
   return Math.floor(Math.random()*(max - min) + min);
}
const movess:Move[] = [];
for(let i =0;i < 300;i++){
    const move:Move = new Move();
    move.areas = `[${areas[random(areas.length,0)]},${areas[random(areas.length,0)]},${areas[random(areas.length,0)]}]`;
    move.name = names[random(names.length,0)];
    move.types = `[${types[random(types.length,0)]},${types[random(types.length,0)]},${types[random(types.length,0)]}]`;
    move.timeLog = random(200,10);
    move.isHot =isTrue[random(isTrue.length,0)];
    move.isClassic =isTrue[random(isTrue.length,0)];
    movess.push(move);
}

MoveModel.bulkCreate(movess).then(err=>{
    console.log(err);
});
// MoveServices.addMove(move).then(eero=>{
//     if(eero instanceof Array){
//         console.log(eero);
//     }else{
//         console.log(eero);
//     }
// });
// MoveServices.removeMoveById(100);
// MoveServices.updateMoveById(4,{isClassic:false,isHot:false}).then(err=>{
//     console.log(err);
// })
// MoveServices.findById(2).then(eeor=>{
//     console.log(eeor);
// });
// MoveServices.findByPage({page:4,key:"功",size:11}).then(data=>{
//     console.log(data);
// });