import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid'
import { ResponseHander } from "./ResponseHander";
const pictureExten = [".jpg",".jpeg",".png",".gif"]
const  storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
    //  确定上传我呢间存放文件夹
    const  uploadDir = path.resolve(__dirname,"../../public/upload");
      cb(null, uploadDir)
    },
    filename:  (req, file, cb)=> {
      const fileName = path.extname( file.originalname);
      cb(null, Date.now()+"-" + uuidv4().slice(0,10) + '-' +fileName)
    }
  })

  function fileFilter (req, file, cb) {
    // 获得文件扩展名
    const fileName = path.extname(file.originalname).toLocaleLowerCase();
    if(pictureExten.includes(fileName)){
        cb(null, true);
    }else{
        cb(new multer.MulterError('LIMIT_FIELD_COUNT','文件只支持 .jpg ,  .jpeg , .png, .gif) 格式'));
    }
  }

const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024
    },
    fileFilter
}).single("upload");
const uploadRouter = express.Router();
uploadRouter.post("/",(req,res)=>{
    upload(req, res,  (err) =>{
        if (err instanceof multer.MulterError) {
           ResponseHander.responsData({status:500,msg:"fail",data:{mes:err.field}},res);
           return;
        } else if (err) {
          throw new Error(err.message);
        }
        // 将文件路径返回
        const pathFile = `/upload/${req.file.filename}`;
        ResponseHander.responsData({status:200,msg:"success",data:{msg:pathFile}},res);
      })
});
export {uploadRouter} ;