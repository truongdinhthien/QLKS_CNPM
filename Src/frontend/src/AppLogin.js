import React, { Component } from 'react';
// import { Switch, Route, BrowserRouter as Router,withRouter } from 'react-router-dom';
import callApi from './callerApi';

export class AppLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Username: '',
            Password: '',
            Error: ''
        }
    }

    // window.addEventListener("beforeunload", (ev) => 
    // {  
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });

    componentDidMount() {
        console.log(this)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let result = await callApi('login', 'POST', {
            Username: this.state.Username,
            Password: this.state.Password,
        })
        if (result && result.data && result.data.success) {
            if (result.data.data.role === "ADMIN") {
                localStorage.setItem("fakeToken", "admintoken")
                localStorage.setItem("id", result.data.data.employerId)
                this.props.history.push('/admin-mode');
            }
            else {
                localStorage.setItem("fakeToken", "employertoken")
                localStorage.setItem("id", result.data.data.employerId)
                this.props.history.push('/employer-mode');
            }
        }
        else {
            console.log(result.data.message)
            this.setState({
                Error: result.data.message
            })
        }

        // console.log(this.state)
        // this.props.history.push('/admin-mode');
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
        // console.log(this.state.Username)
    }

    render() {
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Hotel Application</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center ">
                        <div id="login-column" className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                            <div id="login-box">
                                <form onSubmit={this.handleSubmit} id="login-form" className="form">
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Tên đăng nhập : </label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            name="Username"
                                            id="username"
                                            value={this.state.Username}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Mật khẩu</label><br></br>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={this.onChange}
                                            id = "password"
                                            name="Password"
                                            value={this.state.Password}
                                            required
                                        />

                                    </div>
                                    <div className="clearfix">
                                        <p className="text-danger float-left">{this.state.Error}</p>
                                        <button type="submit" className="btn btn-info btn-md float-right">
                                        Submit
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AppLogin;
