import { message, Spin } from 'antd';
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { ComMovieFormInput, InitialValues } from '../../components/ComMovieForm'
import { MovieServices } from '../../services'

export default class AddMovie extends Component<RouteComponentProps> {
    state={
        isloading:false
    }
    async onValidataPass(data: Required<InitialValues>){
      this.setState({...this.state, isloading:true})
      const  addResult =   await MovieServices.addMovie(data as any);
      //添加数据成功
      if(addResult.status === 200){
        this.setState({...this.state, isloading:false})
        message.success("添加--"+data.name+"--成功", 2, ()=>{
            this.props.history.replace("/list");
        })
      }else{//添加数据失败
        this.setState({...this.state, isloading:false})
        message.success("添加--"+data.name+"--失败", 2)
      }
    }
    getinitialValues():InitialValues{
        return{
            timeLog:30,
            isClassic:"false",
            isHot:"false",
            types:["励志","喜剧"],
            areas:["欧美","香港"]
        }
    }
    render() {
        return (
            <>
                 {this.state.isloading && <div className="addMovieOver">
                    <Spin/>
                  </div>}
                 <ComMovieFormInput initialValues={this.getinitialValues()} onValidataPass={this.onValidataPass.bind(this)}/>
            </>
        )
    }
}
