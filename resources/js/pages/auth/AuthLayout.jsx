import React from "react";
import "./AuthLayout.css"
import {Layout, Menu} from "antd";
import {NavLink, Outlet} from "react-router-dom";

export default function AuthLayout() {
    const {Header, Content, Footer} = Layout;

    const headerMenuItems = [
        {
            path: '/login',
            key: 'login',
            label: 'Login',
        },
        {
            path: '/register',
            key: 'register',
            label: 'Register',
        }
    ]

    return (

        <Layout style={{minHeight: '100vh'}}>
            <Header style={{"background": "#426b93"}}>
                <Menu theme="dark" mode="horizontal" style={{"background": "#426b93", "font-size":"17px", "color":"white"}}>
                    {headerMenuItems.map(function (el) {
                        return <Menu.Item key={el.key}>
                            <NavLink className="text-decoration-none"
                                     to={el.path}>{el.label}</NavLink>
                        </Menu.Item>

                    })}
                </Menu>
            </Header>
            <Content>
                <Outlet/>
            </Content>
            <Footer style={{
                "width": "100 %",
                "background-color": "rgba(0,0,0,0.1)",
                "color": "black",
                "text-align": "center",
                "flex-direction": "column",
                "padding-top": "10px",
                "padding-bottom": "10px",
            }}>All rights reserved ©2023</Footer>
        </Layout>
        /*
            <div className="container__view">
                <div className="container-fluid ">
                    <div className="container__wrapper">
                        <div className="container__card">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>*/
    )
}
