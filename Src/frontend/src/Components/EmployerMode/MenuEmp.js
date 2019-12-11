import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name : "Trang chủ",
        to : '/employer-mode',
        exact : true
    },
    
    {
        name : "Tình trạng phòng",
        to : '/employer-mode/show-status',
        exact : false
    },
    {
        name : "Xem Bill",
        to : '/employer-mode/show-bill',
        exact : false
    },
];

const MenuLink = ({label,to,activeOnlyWhenExact}) => {
    return (
        <Route
            path = {to}
            exact = {activeOnlyWhenExact}
            children = {({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className = {active} >
                        <Link to = {to} className = "nav-link">
                            {label} 
                        </Link>
                    </li>
                );
            }}

        />
    );

    
    
}

export class MenuEmp extends Component {
    render() {
        return (
            <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Bootstrap Sidebar</h3>
            </div>
                {/* <span className="navbar-brand">
                    <i className="fas fa-camera"></i>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav"> */}
                    <ul className="nav navbar-nav">
                        { this.showMenus(menus) }
                    </ul>
                {/* </div> */}
            </nav>
        );
    }
    showMenus = (menus) => {
        var result = null;
        if(menus.length >0 )
        {
            result = menus.map((menu,index) => {
                return (
                    <MenuLink
                        key = {index}
                        label = {menu.name}
                        to = {menu.to}
                        exact = {menu.activeOnlyWhenExact}
                    />
                );
            });
        }
        return result;
    }
}

export default MenuEmp;
