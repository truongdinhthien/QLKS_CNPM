import React, { Component } from 'react';
import Menu from './Components/Menu'
import routes from './routes';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import callApi from './callerApi'

class AppAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLogin: []
        }
    }

    Logout = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

    componentDidMount = async () => {
        console.log(localStorage.getItem("fakeToken"))
        if (localStorage.getItem("fakeToken") !== "admintoken")
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
                    <Menu> </Menu>
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button type="button" id="sidebarCollapse" className="btn btn-info">
                                    <i className="fas fa-align-left" />
                                    <span>Toggle Sidebar</span>
                                </button>
                                <button className="btn btn-danger mt-1" onClick={this.Logout}>Đăng xuất</button>
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

export default AppAdmin;