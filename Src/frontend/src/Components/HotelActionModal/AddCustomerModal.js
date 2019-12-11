import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';
class AddCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmnd: this.props.cmnd,
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: '-1',
            cmndError: '',
            fullNameError: '',
            phoneNumberError: '',
            addressError: '',
            genderError: '',
        }

        
    }
    checkValidate () {

        var fullNameVali = true;
        var cmndVali = true;
        var phoneNumberVali = true;
        var genderVali = true;
        var addressVali = true;

        var regex_sdt = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var regex_cmnd = new RegExp("[0-9]{9}");
        //Fullname
        if (this.state.fullName === '') {
            this.setState({
                fullNameError: 'Vui lòng nhập tên'
            });
            fullNameVali = false;
        }

        if (fullNameVali === true) {

            this.setState({
                fullNameError: '',
            });
        }
        //CMND
        if (this.state.cmnd === '') {
            this.setState({
                cmndError: 'Vui lòng nhập số CMND'
            });
            cmndVali = false;
        }
        else if (!this.state.cmnd.match(regex_cmnd)) {
            this.setState({
                cmndError: 'CMND không hợp lệ'
            });
            cmndVali = false;
        }

        if (cmndVali === true) {
            this.setState({
                cmndError: '',
            });
        }
        //SDT
        if (this.state.phoneNumber === '') {
            this.setState({
                phoneNumberError: 'Vui lòng nhập số điện thoại'
            });
            phoneNumberVali = false;
        }
        else if (!regex_sdt.test(this.state.phoneNumber)) {
            this.setState({
                phoneNumberError: 'Số điện thoại không hợp lệ'
            });
            phoneNumberVali = false;
        }

        if (phoneNumberVali === true) {
            this.setState({
                phoneNumberError: '',
            });
        }
        //GioiTinh
        if (this.state.gender === '-1') {
            this.setState({
                genderError: 'Vui lòng chọn giới tính'
            });
            genderVali = false;
        }

        if (genderVali === true) {

            this.setState({
                genderError: '',
            });
        }
        //Address
        if (this.state.address === '') {
            this.setState({
                addressError: 'Vui lòng địa chỉ'
            });
            addressVali = false;
        }

        if (addressVali === true) {
            this.setState({
                addressError: '',
            });
        }
        
        // e.preventDefault();
        if (addressVali && phoneNumberVali && genderVali && cmndVali && fullNameVali) {
            return true;
        }
        return false
    }

    onAdd = async (e) => {
        e.preventDefault();
        if(this.props.who === "staff")
        await this.setState({
            cmnd: this.props.cmnd
        })
        if (this.checkValidate()) {
            
            console.log(this.state);
            let result = await callApi('customer', 'POST', {
                cmnd: this.state.cmnd,
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
            })
            console.log(result);
            if (result && result.data && result.data.success) {
                this.props.onHide()
                alert('Thêm thành công')
                if (this.props.who === "admin")
                    this.props.getdata()
                if (this.props.who === "staff")
                    this.props.close(result.data.data)
            } else {
                // console.log(result);
                this.setState({
                    cmndError: result.data.message
                })
            }
        }

    }

    // componentDidMount = () => {
    //     if (this.props.who === "staff")
    //     {
    //         this.setState({
    //             cmnd : this.props.cmnd
    //         })
    //     }
    // }

    showCMND = () => {
        if (this.props.who === "admin")
            return (
                <React.Fragment>
                    <Form.Control onChange={this.onChange} value={this.state.cmnd} name="cmnd" type="text" placeholder="Nhập Số CMND..." />
                    <div className="panel panel-default">
                        <p className="text-danger">{this.state.cmndError}</p>
                    </div>
                </React.Fragment>
            );
        if (this.props.who === "staff") {
            // this.setState({
            //     cmnd : this.props.cmnd
            // })
            return (
                <React.Fragment>
                    <Form.Control value={this.props.cmnd} name="cmnd" type="text" readOnly />
                </React.Fragment>
            );
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={this.onAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thêm khách hàng
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">
                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Tên khách hàng (*)
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} value={this.state.fullName} name="fullName" type="text" placeholder="Nhập Tên khách hàng  ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.fullNameError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Số CMND (*)
                            </Form.Label>
                                <Col sm="10">
                                    {/* <Form.Control onChange={this.onChange} value={this.state.cmnd} name="cmnd" type="text" placeholder="Nhập Số CMND..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.cmndError}</p>
                                    </div> */}
                                    {this.showCMND()}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Số điện thoại (*)
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" type="text" placeholder="Nhập Số điện thoại..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.phoneNumberError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Giới tính (*)
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} as="select" value={this.state.gender} name="gender">
                                        <option defaultValue value="-1" >Chọn</option>
                                        <option value="Nam" >Nam</option>
                                        <option value="Nữ" >Nữ</option>
                                    </Form.Control>
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.genderError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Địa chỉ (*)
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} value={this.state.address} name="address" type="text" placeholder="Nhập Địa chỉ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.addressError}</p>
                                    </div>
                                </Col>
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        );
    }
}

export default AddCustomerModal;
