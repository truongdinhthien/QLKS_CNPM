import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';
class AddServiceModal extends Component {
    constructor(props) {
        super(props);
        if (this.props.what === "add") {
            this.state = {
                nameService: '',
                priceService: '',
                nameServiceError: '',
                priceServiceError: ''
            }
        }

        if (this.props.what === "edit") {
            this.state = {
                id: this.props.service.roomServiceId,
                nameService: this.props.service.nameService,
                priceService: this.props.service.priceService,
                nameServiceError: '',
                priceServiceError: ''
            }
        }
    }

    checkValidate(e) {
        var nameServiceVali = true;
        var priceServiceVali = true;
        if (this.state.nameService === '') {
            this.setState({
                nameServiceError: 'Vui lòng tên dịch vụ'
            });
            nameServiceVali = false;
        }
        if (nameServiceVali === true) {
            this.setState({
                nameServiceError: ''
            });
        }
        if (this.state.priceService === '') {
            this.setState({
                priceServiceError: 'Vui lòng nhập giá dịch vụ',
            });
            priceServiceVali = false;
        }

        else if (isNaN(this.state.priceService)) {
            this.setState({
                priceServiceError: 'Giá dịch vụ phải là số',
            });
            priceServiceVali = false;
        }
        if (priceServiceVali === true) {
            this.setState({
                priceServiceError: ''
            });
        }
        e.preventDefault();
        if (priceServiceVali && nameServiceVali) {
            return true;
        }
        return false

    }

    onAdd = async (e) => {
        if (this.checkValidate(e)) {
            e.preventDefault();
            if(this.props.what === "add")
            {
                let result = await callApi('roomservice', 'POST', {
                    nameService: this.state.nameService,
                    priceService: this.state.priceService
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Thêm thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        nameServiceError: result.data.message
                    })
                }
            }
            if(this.props.what === "edit")
            {
                console.table(this.state);
                let result = await callApi(`roomservice/${this.state.id}`, 'PUT', {
                    nameService: this.state.nameService,
                    priceService: this.state.priceService
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Sửa thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        nameServiceError: result.data.message
                    })
                }
            }
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
                            Thêm dịch vụ
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Tên dịch vụ
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} name="nameService" value={this.state.nameService} type="text" placeholder="Nhập Tên dịch vụ ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.nameServiceError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Giá tiền
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChange} name="priceService" value={this.state.priceService} type="text" placeholder="Nhập giá tiền ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.priceServiceError}</p>
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

export default AddServiceModal;