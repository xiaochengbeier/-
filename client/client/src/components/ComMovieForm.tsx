import { Form, Input, Button, Checkbox, InputNumber, Radio} from 'antd';
import { FormInterface } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React from  'react';
import { ComUpload } from './ComUpload';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const options = [
    { label: '喜剧', value: '喜剧' },
    { label: '励志', value: '励志' },
    { label: '感动', value: '感动' },
     { label: '科幻', value: '科幻' },
     { label: '警匪', value: '警匪' },
  ];
  const areasOptions = [
    { label: '香港', value: '香港' },
    { label: '日本', value: '日本' },
    { label: '大陆', value: '大陆' },
     { label: '东亚', value: '东亚' },
     { label: '欧美', value: '欧美' },
  ];
export interface InitialValues{
   areas?: string[]; 
   description?:string;
   id?:number;
   isClassic?: "false"|"true";
   isHot?: "false"|"true";
   name?: string;
   poster?: string;
   timeLog?: number;
   types?: string[];
}
 interface MovieFormType {
     id?:string;
     onValidataPass:(data:any)=>void;
     initialValues?:InitialValues
 }
 export  class  ComMovieFormInput extends React.Component<MovieFormType> {  
    formRef:React.RefObject<any> = React.createRef();
    passValidata(data:any){
        data.areas = JSON.stringify(data.areas);
        data.types = JSON.stringify(data.types);
        this.props.onValidataPass(data);
    }
    componentDidUpdate(){
        this.formRef.current && this.formRef.current.setFieldsValue(this.props.initialValues);
    }
   render(){
    return (
        <>
            <Form
                ref = {this.formRef}
                style={{width:"50%"}}
                {...layout}
                onFinish={this.passValidata.bind(this)}
                initialValues={this.props.initialValues}
            >
               <Form.Item
                  label="电影名"
                  name="name"
                  rules={[{ required: true, message: '电影名不能为空!' }]}
               >
                   <Input/>
               </Form.Item>
               <Form.Item
                  label="电影封面"
                  name="poster"
               >
                   <ComUpload/>
               </Form.Item>

               <Form.Item
                  label="电影类型"
                  name="types"
                  rules={[{ required: true, message: '电影类型不能为空!' }]}
               >
                     <Checkbox.Group options={options} />
               </Form.Item>

               <Form.Item
                  label="上映地区"
                  name="areas"
                  rules={[{ required: true, message: '上映地区不能为空!' }]}
               >
                     <Checkbox.Group options={areasOptions}  />
               </Form.Item>

               <Form.Item
                  label="电影时长"
                  name="timeLog"
               >
                    <InputNumber size="large" min={1} max={100000}  />
               </Form.Item>

               <Form.Item
                  label="是否热映"
                  name="isHot"
               >
                    <Radio.Group  buttonStyle="solid">
                            <Radio.Button value="true">是</Radio.Button>
                            <Radio.Button value="false">否</Radio.Button>
                   </Radio.Group>
               </Form.Item>

               <Form.Item
                  label="是否经典"
                  name="isClassic"
               >
                     <Radio.Group  buttonStyle="solid">
                            <Radio.Button value="true">是</Radio.Button>
                            <Radio.Button value="false">否</Radio.Button>
                     </Radio.Group>
               </Form.Item>

               <Form.Item
                  label="电影描述"
                  name="description"
               >
                    <TextArea
                        placeholder="电影咋样呀 说说你的感受 ！！"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        />
               </Form.Item>


               <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
            </Form>
        </>
    )
   }
    
}
// areas: "[日本,西安]"
// description: null
// id: 2
// isClassic: "false"
// isHot: "false"
// name: "不好看的电影"
// poster: "www.badul.ocm"
// timeLog: 400
// types: "[励志,感动]"
