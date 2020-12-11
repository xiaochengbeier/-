import express from "express"
import { inflateSync } from "zlib";
import { Move } from "../entities/Moves";
import { MoveServices } from "../services/MoveServices";
import { ResponseHander } from "./ResponseHander";
const router = express.Router();
// 添加电影
router.post("/",async (req,res)=>{
    // 获得添加数据对象
    const body = req.body;
    const addResult = await MoveServices.addMove(body);
    if(addResult instanceof Array){
       ResponseHander.responsData({status:500,msg:"fail",data:addResult},res)
    }else{
        ResponseHander.responsData({status:200,msg:"success",data:null},res)
    }
})
// 根据id删除电影
router.delete("/:id",async (req,res)=>{
    // 获得id
    const id = +req.params.id;
    const deleteResult = await  MoveServices.removeMoveById(id);
    if(deleteResult){
        ResponseHander.responsData({status:200,msg:"success",data:null},res)
    }else{
        ResponseHander.responsData({status:500,msg:"fail",data:{msg:"删除失败"}},res);
    }
})
// 修改电影
router.put("/:id",async (req,res)=>{
    // 获得id
    const id = +req.params.id;
      // 获得修改数据对象
    const body = req.body;
    const updataResult = await   MoveServices.updateMoveById(id,body);
    if(updataResult instanceof Array){
        ResponseHander.responsData({status:500,msg:"fail",data:updataResult},res);
    }else{
       if(updataResult){
        ResponseHander.responsData({status:200,msg:"success",data:null},res);
       }else{
        ResponseHander.responsData({status:500,msg:"fail",data:{msg:"修改失败"}},res);
       }

    }
})
// 根据id查询电影
router.get("/:id",async (req,res)=>{
    // 获得id
    const id = +req.params.id;
    const findResult =  await MoveServices.findById(id);
    if(findResult == null){
        ResponseHander.responsData({status:500,msg:"fail",data:{msg:"查询失败"}},res);
    }else{
        ResponseHander.responsData({status:200,msg:"success",data:findResult},res);
    }
})
// 根据条件查询
router.get("/",async (req,res)=>{
    // 获得查询数据对象
    const body = req.query;
    const findResult =  await MoveServices.findByPage(body);
    if(findResult instanceof Array){
        ResponseHander.responsData({status:500,msg:"fail",data:findResult},res);
    }else{
        ResponseHander.responsData({status:200,msg:"success",data:findResult},res);
    }
})
export{router};