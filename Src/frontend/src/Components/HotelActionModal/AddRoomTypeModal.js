import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';

class AddRoomTypeModal extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        if(this.props.what === "add" )
        {
            this.state = {
                nameRoomType: '',
                priceRoom: '',
                nameRoomTypeError: '',
                priceRoomError: '',
                validated: true
            }
        }
        if(this.props.what === "edit")
        {
            this.state = {
                id : this.props.roomtype.roomTypeId,  
                nameRoomType: this.props.roomtype.nameRoomType,
                priceRoom: this.props.roomtype.priceRoom,
                nameRoomTypeError: '',
                priceRoomError: '',
                validated: true
            }
        }
        
    }

    checkValidate(e) {
        var nameRoomTypeVali = true;
        var priceroomVali = true;
        if (this.state.nameRoomType === '') {
            this.setState({
                nameRoomTypeError: 'Vui lòng nhập tên loại phòng'
            });
            nameRoomTypeVali = false;
        }
        if (nameRoomTypeVali === true)
        {
            this.setState({
                nameRoomTypeError : ''
            });
        }
        if (this.state.priceRoom === '') {
            this.setState({
                priceRoomError: 'Vui lòng nhập giá phòng',
            });
            priceroomVali = false;
        }

        else if (isNaN(this.state.priceRoom)) {
            this.setState({
                priceRoomError: 'Giá phòng phải là số',
            });
            priceroomVali = false;
        }
        if (priceroomVali === true)
        {
            this.setState({
                priceRoomError : ''
            });
        }
        e.preventDefault();
        if (priceroomVali && nameRoomTypeVali)
        {
            return true;
        }
        return false
        
    }

    onAdd = async (e) => {
        if (this.checkValidate(e)) {
            e.preventDefault();
            if(this.props.what === "add")
            {
                let result = await callApi('roomtype', 'POST', {
                    nameRoomType: this.state.nameRoomType,
                    priceRoom: this.state.priceRoom
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Thêm thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        nameRoomTypeError: result.data.message
                    })
                }
            }
            if(this.props.what === "edit")
            {
                let result = await callApi(`roomtype/${this.state.id}`, 'PUT', {
                    nameRoomType: this.state.nameRoomType,
                    priceRoom: this.state.priceRoom
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Sửa thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        nameRoomTypeError: result.data.message
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
                <Form
                    onSubmit={this.onAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thêm loại phòng
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Loại phòng *
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        onChange={this.onChange}
                                        name="nameRoomType"
                                        value={this.state.nameRoomType}
                                        type="text"
                                        placeholder="Nhập loại phòng ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.nameRoomTypeError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Giá tiền *
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        onChange={this.onChange}
                                        name="priceRoom"
                                        value={this.state.priceRoom}
                                        type="text"
                                        placeholder="Nhập giá tiền ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.priceRoomError}</p>
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

export default AddRoomTypeModal;