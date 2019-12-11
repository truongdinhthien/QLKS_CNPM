import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { MenuEmp } from './Components/EmployerMode/MenuEmp';
import HomePage from './Pages/HomePage';
import CheckStatusPage from './Components/EmployerMode/CheckStatus/CheckStatusPage';
import RentRoomPage from './Components/EmployerMode/CheckStatus/RentRoomPage';
import NotFoundPage from './Pages/NotFoundPage';
import BillListPage from './Pages/HotelListPage/BillListPage'
import callApi from './callerApi'
const routes = [
    {
        path: '/employer-mode',
        exact: true,
        main: () => <HomePage></HomePage>
    },
    {
        path: '/employer-mode/show-status',
        exact: false,
        main: () => <CheckStatusPage></CheckStatusPage>
    },
    {
        path: '/employer-mode/show-bill',
        exact: false,
        main: () => <BillListPage></BillListPage>
    },
    {
        path: '/employer-mode/:id/rent-room',
        exact: false,
        main: ({ match }) => <RentRoomPage match={match}></RentRoomPage>
    },
    {
        path: '/employer-mode',
        exact: false,
        main: () => <NotFoundPage />
    }
]

export class AppEmployer extends Component {
    Logout = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

    componentDidMount = async () => {
        console.log(localStorage.getItem("fakeToken"))
        if (localStorage.getItem("fakeToken") !== "employertoken")
            this.props.history.push("/");
        else {
            var id = localStorage.getItem("id")
            let result = await callApi(`employer/${id}`, 'GET', null)
            if (result && result.data && result.data.success) {
                this.setState({
                    dataLogin: result.data.data
                })
                console.log(this.state.dataLogin);
            } else {
                console.log("Lỗi ko load được dữ liệu login");
                console.log(result);
            }
        }
    }

    render() {
        return (
            <Router>
                <div className="wrapper">
                    <MenuEmp> </MenuEmp>
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button type="button" id="sidebarCollapse" className="btn btn-info">
                                    <i className="fas fa-align-left" />
                                    <span>Toggle Sidebar</span>
                                </button>
                                <button className="btn btn-danger" onClick={this.Logout}>Đăng xuất</button>
                            </div>
                        </nav>
                        {this.showContentMenu(routes)}
                    </div>
                </div>
            </Router>
        );
    }

    showContentMenu = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    }
}

export default AppEmployer;
