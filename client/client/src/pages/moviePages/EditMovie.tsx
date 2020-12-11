import { message } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ComMovieFormInput, InitialValues} from '../../components/ComMovieForm'
import { MovieServices } from '../../services'

export  class  EditMovie extends React.Component<RouteComponentProps> {
    state={
        movie: undefined
    }
    updataMovie(data:any){
        if(this.props.location.state){
            MovieServices.updataMovie(parseInt(this.props.location.state as any),data).then((rdata)=>{
                if(rdata.status === 200){
                    message.success("修改--"+data.name+"--成功", 1, ()=>{
                        this.props.history.replace("/list");
                    })
                  }else{//修改数据失败
                    message.success("修改--"+data.name+"--失败", 1)
                  }
            });
        }
    }
    //根据传入的id查询数据
    componentDidMount(){
        if(this.props.location.state){
            MovieServices.findMovieById( parseInt(this.props.location.state as any)).then((data:any)=>{
               if(data.status === 200){
                //    replace(/(\[|\])/g,"").split(",")
                   let areas= null;
                   let types = null;
                   try{
                    areas =  JSON.parse(data.data.areas);
                    types = JSON.parse(data.data.types);
                   } catch(err){
                    areas =  data.data.areas.replace(/(\[|\])/g,"").split(",")
                    types =   data.data.types.replace(/(\[|\])/g,"").split(",")
                   }
                  
                   const dataInit:InitialValues = {
                       name:data.data.name,
                       areas:areas,
                       types:types,
                       timeLog:data.data.timeLog,
                       isClassic:data.data.isClassic,
                       isHot:data.data.isHot,
                       poster:data.data.poster,
                       description:data.data.description
                   };
                  
                   this.setState({
                       ...this.state,
                       movie:dataInit
                   });
               }
            });
        }
       
    }
    render(){
        console.log(this.state);
        return (
            <>
              {/* {this.state.movie &&<ComMovieFormInput onValidataPass={()=>{}} initialValues={this.state.movie}/>} */}
              <ComMovieFormInput onValidataPass={this.updataMovie.bind(this)} initialValues={this.state.movie}/>
            </>
        )
    }
  
}
