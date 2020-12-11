import React, { Component } from 'react'
import {Layout,Menu} from "antd"
import AddMovie  from "./moviePages/AddMovie"
import MovieList from "./moviePages/MoviList"
import {Link, NavLink,Redirect,Switch,Route, RouteComponentProps}from "react-router-dom"
import { EditMovie } from './moviePages/EditMovie'
const {Header,Sider,Content} = Layout;
export default class PageIndex extends Component<RouteComponentProps> {
    state ={
        defaultSelectedKeys:["/list"]
    }
    componentDidMount(){
        this.props.history.listen((location,action)=>{
            console.log(location);
            this.setState({
                ...this.state ,
                defaultSelectedKeys: [location.pathname]
            });
        })
    }
    render() {
        return (
            <div className="layout_wraper">
            <Layout>
                <Header>
                    <Link to="/">猫眼电影管理系统</Link>
                </Header>
                <Layout>
                    <Sider>
                       <Menu
                        theme="dark"
                        selectedKeys={this.state.defaultSelectedKeys}
                       >
                           <Menu.Item key="/list">
                                <NavLink to="/list" >电影列表</NavLink>
                           </Menu.Item>
                           <Menu.Item key="/add">
                                <NavLink to="/add">添加学生</NavLink>
                           </Menu.Item>
                       </Menu>
                    </Sider>
                    <Content style={{padding:"30px 0px 0px 30px",overflow:"auto"}}>
                            <Switch>
                                <Route path="/list" component={MovieList}/>
                                <Route path="/add" component={AddMovie}/>
                                <Route path="/edit" component={EditMovie}/>
                                <Redirect to="/list"  from="/" />
                                
                            </Switch>
                    </Content>
                </Layout>
            </Layout>
            </div>
        )
    }
}
