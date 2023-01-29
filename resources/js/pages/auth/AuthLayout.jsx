import React from "react";
import "./AuthLayout.css"
import {Layout, Menu} from "antd";
import {NavLink, Outlet} from "react-router-dom";

export default function AuthLayout() {
    const {Header, Content, Sider, Footer} = Layout;

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
            <Header>
                <Menu theme="dark" mode="horizontal">
                    {headerMenuItems.map(function(el) {
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
            <Footer>FOOTER</Footer>
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
