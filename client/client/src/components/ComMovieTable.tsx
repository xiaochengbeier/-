import { Table,Switch,Input, message, Space, Button,Image, Popconfirm  } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import React, { Component, Dispatch } from 'react'
import {connect}from "react-redux"
import { MovieActionType, MovieActionTypes, MovieState } from '../redux/reducer/Types';
import { RootState } from '../redux/Types';
import { IMovie } from '../services/Types';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { MovieServices } from '../services';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { RouteComponentProps, withRouter } from 'react-router-dom';



/**
 * 当前组件需要的事件初始化的时候从服务器获得数据
 */
interface ComMovieTableEvent{
    /**
     * 在组件初始化请求服务器加载数据
     */
    fetchMovieData?:()=>void;
    /**
     * 向后台发送数据根据id修改 "isHot"|"isClassic"
     */
    changIsHotAndClassic:(flage:"isHot"|"isClassic",value:"true"|"false",id:number)=>void ;
     /**
      * 根据分页组件设置搜索条件
      */
    onPageChange:(page:number,size:number,key:string)=>void;
    /**
     * 根据id删除数据
     */
    onDeleteById:(id:number)=>void;
}
/**
 * 当前state的数据类型
 */
interface StateType{
    isLoading: boolean;
    searchKey: string
}
 class ComMovieTable extends Component<MovieState &  ComMovieTableEvent & RouteComponentProps,StateType> {
    state:StateType={
        isLoading : this.props.isLoading,
        searchKey: this.props.searchCondition.key
    };
    searchInputRef:React.RefObject<any>= React.createRef();
    componentDidMount(){
        if(this.props.fetchMovieData){
            this.props.fetchMovieData();
        }
    };
    /**
     * 根据条件查询数据
     */
    findByCondition(key:string){
        this.props.onPageChange(1,10,key);
        //   重新查询数据
        if(this.props.fetchMovieData){
          this.props.fetchMovieData();
        }
    }
    /**
     * 点击分页器修改查询条件并且重新获得数据
     * @param pagination 
     */
   async  changHand(pagination:TablePaginationConfig){
          const oldSearch = this.props.searchCondition;
          let page = pagination.current || oldSearch.page;
          let size = pagination.pageSize || oldSearch.size;
          let key = this.props.searchCondition.key;
          this.props.onPageChange(page!,size!,key);
          //   重新查询数据
          if(this.props.fetchMovieData){
            this.props.fetchMovieData();
          }
    }
    /**
     * 分页器配置
     */
    getPagination():TablePaginationConfig{
       return{
           total: this.props.movieData.count,
           current: this.props.searchCondition.page,
           pageSize: this.props.searchCondition.size,
           position:['bottomCenter'],
        //    showSizeChanger: false
       }
    }
    /**
     * 修改"isHot"|"isClassic" 并设置isLoading
     * @param flage 
     * @param value 
     * @param id 
     */
    changeIsHotAndIsClassic(flage:"isHot"|"isClassic",value:"true"|"false",id:number){
         this.props.changIsHotAndClassic(flage,value,id);
    }
    getColumns():ColumnsType<IMovie>{
        return[
            {title:"电影封面",dataIndex:"poster",
            render:(text, record, index)=>{

                return( <Image
                    width={50}
                    style={{cursor:"pointer"}}
                    src={record.poster||"/upload/nopic.jpg"}
                  />)
            }},
            {title:"电影名字",dataIndex:"name",
             filterDropdown:(data:FilterDropdownProps)=>{
                 return (
                    <div style={{ padding: 8 }}>
                    <Input
                      ref={this.searchInputRef}
                      defaultValue={this.state.searchKey}
                      onBlur={(event)=>{
                          this.setState({
                              ...this.state,
                              searchKey:event.target.defaultValue
                          })
                      }}
                      style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                      <Button
                        type="primary"
                        onClick={() =>{
                            this.findByCondition(this.state.searchKey);
                            data.clearFilters&& data.clearFilters();
                        }}
                      >
                        搜索
                      </Button>
                      <Button
                        onClick={() =>{
                            this.findByCondition("");
                            this.searchInputRef.current.setValue("");
                            data.clearFilters&& data.clearFilters();
                        }}
                      >
                        重置
                      </Button>
                    </Space>
                  </div>
                 ); 
             },
            //  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            },
            {title:"类型",dataIndex:"types"},
            {title:"上映地区",dataIndex:"areas"},
            {title:"时长",dataIndex:"timeLog"},
            {title:"是否热映",dataIndex:"isHot",
            render:(text, record, index)=>{
                return (<>
                    <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={record.isHot == "true"}
                    checked={record.isHot == "true"}
                    onChange= { async (checked:any)=>{
                         checked = checked+""
                         this.changeIsHotAndIsClassic("isHot",checked,record.id!);
                    }}
                    />
                </>)
            }
            },
            {title:"是否经典",dataIndex:"isClassic",
                render:(text, record, index)=>{
                    return (<>
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.isClassic == "true"}
                        checked={record.isClassic == "true"}
                        onChange={(checked:any)=>{
                            checked = checked+""
                            this.changeIsHotAndIsClassic("isClassic",checked,record.id!);
                        }}
                        />
                    </>)
                }
            },
            {title:"电影描述",dataIndex:"description"},
            {title:"操作",render:(text, record, index)=>{
                return (<>
                     <Button size="small" type="primary" onClick={()=>{
                         this.props.history.push({pathname:"/edit",state:record.id})
                     }}>修改</Button>
                      <Popconfirm
                        title={`确定删除--${record.name}--吗`}
                        onConfirm={()=>{
                            this.props.onDeleteById(+record.id!);
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button size="small"  type="primary" danger>
                        删除
                        </Button>
                    </Popconfirm>
                   
                </>);
            }},
        ]
    }
    render() {
        return (
            <div>
                <Table  onChange={this.changHand.bind(this)} pagination={ this.getPagination()} loading={this.props.isLoading || this.state.isLoading} dataSource={this.props.movieData.data}  rowKey={columns => +columns.id!} columns={this.getColumns()} />
            </div>
        )
    }
}
/**
 * 映射store中的satate 到组件
 * @param state 
 */
function mapStateToProps(state:RootState):MovieState{
  return{
    ...state.movieState,
    searchCondition:{
        ...state.movieState.searchCondition
    }
  };
}
/**
 * 映射dispatch 到组件
 * @param dispath 
 */
function mapDispatchToProps(dispath:Dispatch<MovieActionTypes>):ComMovieTableEvent{
   return {
       fetchMovieData(){
           dispath({type : MovieActionType.EFFECT_MOVIE_DADA});
       },
       onDeleteById(id:number){
          dispath({type : MovieActionType.EFFECT_DELETE_BY_ID,payload:{id}});
       },
       onPageChange(page:number,size:number,key:string){
           dispath({type:MovieActionType.SET_SEARCH_COMDITION,payload:{page,size,key}})
       },
       changIsHotAndClassic(flage:"isHot"|"isClassic",value:"true"|"false",id:number){
                dispath({type : MovieActionType.EFFECT_IS_HOT_CLASSIC ,payload:{flage,value,id}});
        }
        
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComMovieTable));

