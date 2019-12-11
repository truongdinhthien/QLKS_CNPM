import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';

class AddEmployerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: '-1',
            role : '-1',
            fullNameError: '',
            phoneNumberError: '',
            addressError: '',
            genderError: '',
            roleError : ''
        }
    }

    checkValidate(e) {

        var fullNameVali = true;
        var phoneNumberVali = true;
        var genderVali = true;
        var addressVali = true;
        var roleVali = true;

        var regex_sdt = /((09|03|07|08|05)+([0-9]{8})\b)/g;
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
        //Role
        if (this.state.role === '-1') {
            this.setState({
                roleError: 'Vui lòng chọn quyền'
            });
            roleVali = false;
        }

        if (roleVali === true) {

            this.setState({
                roleError: '',
            });
        }

        e.preventDefault();
        if (addressVali && phoneNumberVali && genderVali && fullNameVali && roleVali) {
            return true;
        }
        return false
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }
    onAdd = async (e) => {
        if (this.checkValidate(e)) {
            let result = await callApi('employer', 'POST', {
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                role : this.state.role
            })
            console.log(result);
            if (result && result.data && result.data.success) {
                this.props.onHide()
                alert('Thêm thành công')
                this.props.getdata()
            }
            else{
                this.setState({
                    phoneNumberError: result.data.message
                })
            }
    }
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
                        Thêm nhân viên
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

                        <Form.Group as={Row} >
                            <Form.Label column sm="2">
                                Quyền hạn (*)
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={this.onChange} as="select" value={this.state.role} name="role">
                                    <option defaultValue value="-1" >Chọn</option>
                                    <option value="ADMIN" >ADMIN</option>
                                    <option value="STAFF" >STAFF</option>
                                </Form.Control>
                                <div className="panel panel-default">
                                    <p className="text-danger">{this.state.roleError}</p>
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

export default AddEmployerModal;