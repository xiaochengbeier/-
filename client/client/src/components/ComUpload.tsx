import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
interface ComUploadProps{
    value?:string;
    onChange?:(responseUrl:string) => void;
}
let i = 1;
export  const ComUpload: React.FC<ComUploadProps> =  function (props) {
    const fileList = [
        {
          name: props.value,
          status:  props.value,
          url: props.value
        },
      ];
      const [preview,setPreview] =   useState({
            previewVisible:false 
        });
    return (
        <>
        <Modal
          visible={preview.previewVisible}
          footer={null}
          onCancel={()=>{
            setPreview({...preview,previewVisible:false});
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={props.value} />
        </Modal>
         <Upload
            accept=".jpg,.jpeg,.png,.gif"
            name="upload"
            action="/upload"
            listType="picture-card"
            fileList={props.value?fileList as any:[]}
            onPreview={()=>{
                setPreview({...preview,previewVisible:true});
            }}
            onRemove={()=>{
                if(props.onChange){
                    props.onChange("");
                    return;
                }
            }}
            onChange={(data:UploadChangeParam)=>{
                 //得到后台响应的数据
                if(props.onChange&& data.fileList[0]&&data.fileList[0].response){
                    props.onChange(data.fileList[0].response.data.msg);
                }
             }}
        >
            {props.value ?"":<div>+上传图片</div>}
      </Upload>
        </>
    )
}
