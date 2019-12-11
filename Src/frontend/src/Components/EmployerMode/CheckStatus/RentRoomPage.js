import React, { Component } from 'react';
import callApi from './../../../callerApi';
import AddCustomerModal from '../../HotelActionModal/AddCustomerModal';
import {withRouter} from 'react-router-dom';


export class RentRoomPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            dataLogin: [],
            cmnd: '',
            cmndError: '',
            roomId: '',
            customer: [],
            dateIn: '',
            dateOut: '',
            dateInError: '',
            dateOutError: '',
            addModalShow: false
        }
    }

    componentDidMount = async () => {
        var { match } = this.props
        if (match) {
            var roomid = match.params.id;
            this.setState({
                roomId: roomid
            })
        }

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

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
        // console.log(value)
    }

    _next = async () => {
        let currentStep = this.state.currentStep
        var regex_cmnd = new RegExp("[0-9]{9}");
        if (currentStep === 1) {
            if (this.state.cmnd === '')
                this.setState({
                    cmndError: 'Vui lòng nhập CMND',
                })
            else if (!this.state.cmnd.match(regex_cmnd)) {
                this.setState({
                    cmndError: 'CMND không hợp lệ'
                });
            }
            else {
                let result = await callApi(`customer/${this.state.cmnd}`, 'GET', null)

                if (result && result.data && result.data.success) {
                    this.setState({
                        currentStep: 2,
                        customer: result.data.data,
                        cmnd: result.data.data.cmnd,
                        cmndError: ''
                    })
                } else {
                    this.setState({
                        cmndError: result.data.message,
                        addModalShow: true
                    })
                }
            }
        }

        if (currentStep === 2) {
            if (this.checkValidateStep2()) {
                this.setState({
                    currentStep: 3
                })
            }
        }
    }

    checkValidateStep2() {
        var dateIn = new Date(this.state.dateIn);
        var dateOut = new Date(this.state.dateOut);
        var vali = true;
        if (this.state.dateIn === '') {
            this.setState({
                dateInError: 'Bạn chưa chọn ngày bắt đầu'
            })
            vali = false
        } else {
            this.setState({
                dateInError: '',
            })
            vali = true;
        }
        if (this.state.dateOut === '') {
            this.setState({
                dateOutError: 'Bạn chưa chọn ngày trả phòng'
            })
            vali = false
        }
        else {
            this.setState({
                dateOutError: '',
            })
            vali = true;
        }

        if (dateIn < dateOut)
        {
            this.setState({
                dateOutError: '',
            })
            vali = true;
        }
        else {
            this.setState({
                dateOutError: 'Ngày trả phòng > Ngày thuê phòng'
            })
            vali = false
        }
        
        return vali;
    }

    _nextAndCloseModal = (customer) => {
        this.setState({
            customer: customer,
            cmndError: '',
            currentStep: 2,
        })
    }

    _prev = () => {
        if (this.state.currentStep === 2) {
            if (window.confirm("Bạn có muốn quay lại ???"))
                this.setState({
                    customer: [],
                    cmnd: '',
                    currentStep: 1
                })
        }
        if (this.state.currentStep === 3) {
            if (window.confirm("Bạn có muốn quay lại ???"))
                this.setState({
                    dateIn: '',
                    dateOut: '',
                    currentStep: 2
                })
        }
        // let currentStep = this.state.currentStep
        // currentStep = currentStep <= 1 ? 1 : currentStep - 1
        // this.setState({
        //     currentStep: currentStep
        // })
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary mt-1"
                    type="button" onClick={this._prev}>
                    Lùi lại
            </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 3) {
            return (
                <button
                    className="btn btn-primary float-right mt-1"
                    type="button" onClick={this._next}>
                    Tiếp theo
            </button>
            )
        }
        return null;
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let result = await callApi('contract', 'POST', {
            roomId: this.state.roomId,
            customerId : this.state.customer.customerId,
            employerId : this.state.dataLogin.employerId,
            dateIn : this.state.dateIn,
            dateOut : this.state.dateOut
        })
        console.log(result);
        if (result && result.data && result.data.success) {
            alert(result.data.message)
             this.props.history.goBack()
        } 
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="text-left">Trang đặt phòng {this.state.roomId}</h1>

                <form onSubmit={this.handleSubmit}>
                    <Step1
                        currentStep={this.state.currentStep}
                        onChange={this.onChange}
                        cmnd={this.state.cmnd}
                        cmndError={this.state.cmndError}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        onChange={this.onChange}
                        customer={this.state.customer}
                        roomId={this.state.roomId}
                        dataLogin={this.state.dataLogin}
                        dateIn={this.state.dateIn}
                        dateOut={this.state.dataOut}
                        dateInError={this.state.dateInError}
                        dateOutError={this.state.dateOutError}
                    />
                    <Step3
                        currentStep={this.state.currentStep}
                        dateIn={this.state.dateIn}
                        dateOut={this.state.dateOut}
                        roomId={this.state.roomId}
                        customer={this.state.customer}
                        dataLogin={this.state.dataLogin}
                    />
                    {this.previousButton()}
                    {this.nextButton()}
                </form>
                <AddCustomerModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    close={this._nextAndCloseModal}
                    who="staff"
                    cmnd={this.state.cmnd}
                ></AddCustomerModal>
            </div>
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return (
        <div className="form-group">
            <label htmlFor="email">Nhập CMND khách hàng</label>
            <input
                className="form-control"
                name="cmnd"
                type="text"
                placeholder="Nhập CMND"
                value={props.cmnd}
                onChange={props.onChange}
            />
            <div className="panel panel-default">
                <p className="text-danger">{props.cmndError}</p>
            </div>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <div className="form-group">
            <ul className="list-group">
                <li className="list-group-item active">Thông tin khách hàng</li>
                <li className="list-group-item">CMND : {props.customer.cmnd}</li>
                <li className="list-group-item">Tên : {props.customer.fullName}</li>
                <li className="list-group-item">Số điện thoại : {props.customer.phoneNumber}</li>
                <li className="list-group-item">Giới tính : {props.customer.gender}</li>
                <li className="list-group-item">Địa chỉ : {props.customer.address}</li>
            </ul>

            <ul className="list-group mt-2">
                <li className="list-group-item active">Thông tin đặt phòng</li>
                <li className="list-group-item">
                    Mã phòng : {props.roomId}
                </li>
                <li className="list-group-item">
                    Tên nhân viên : {props.dataLogin.fullName}
                </li>

                <li className="list-group-item">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày bắt đầu</span>
                        </div>
                        <input type="datetime-local" name="dateIn" value={props.dateIn} onChange={props.onChange} className="form-control" />
                    </div>
                    <div className="panel panel-default">
                        <p className="text-danger">{props.dateInError}</p>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày trả phòng</span>
                        </div>
                        <input type="datetime-local" name="dateOut" value={props.dateOut} onChange={props.onChange} className="form-control" />
                    </div>
                    <div className="panel panel-default">
                        <p className="text-danger">{props.dateOutError}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    else {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item active">Thông tin phiếu đặt phòng</li>
                    <li className="list-group-item">Mã phòng thuê : {props.roomId}</li>
                    <li className="list-group-item">Mã khách hàng : {props.customer.customerId} ( CMND : {props.customer.cmnd} )</li>
                    <li className="list-group-item">Mã nhân viên tạo phiếu : {props.dataLogin.employerId} (Tên : {props.dataLogin.fullName})</li>
                    <li className="list-group-item">Ngày thuê phòng : {props.dateIn}</li>
                    <li className="list-group-item">Ngày trả phòng : {props.dateOut}</li>
                    <button className="btn btn-success mt-2" type="submit">Hoàn thành</button>
                </ul>


            </div>
        )
    }
}


export default withRouter(RentRoomPage);
