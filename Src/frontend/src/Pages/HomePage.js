import React, { Component } from 'react';
import callApi from './../callerApi'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogin: []
        }
    }

    async componentDidMount() {
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

    render() {
        let { dataLogin } = this.state;
        return (
            <>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#profile" data-toggle="tab" className="nav-link active">Thông tin cá nhân</a>
                    </li>
                </ul>

                <div className="tab-content py-4">
                    <div className="tab-pane active" id="profile">
                        <h5 className="mb-3">User Profile</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Tên</h6>
                                <p>
                                    {dataLogin.fullName}
                                </p>
                                <h6>Số điện thoại</h6>
                                <p>
                                    {dataLogin.phoneNumber}
                                </p>
                                <h6>Địa chỉ</h6>
                                <p>
                                    {dataLogin.address}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h6>Giới tính</h6>
                                <p>
                                    {dataLogin.gender}
                                </p>
                                <h6>Quyền hạn</h6>
                                <p>
                                    {dataLogin.role}
                                </p>
                            </div>
                        </div>
                        {/*/row*/}
                    </div>
                </div>
            </>
        );
    }
}

export default HomePage;