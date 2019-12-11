import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';

class AddDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractId: this.props.idcontract,
            service: [],
            roomServiceId: '-1',
            roomServiceError: '',
            Amount: '',
            AmountError: ''
        }
    }
    async componentDidMount() {
        await callApi('roomservice', 'GET', null).then(res => {
            this.setState({
                service: res.data.data
            })
        })
        var utc = new Date().toJSON().slice(0,16)
        console.log(utc)
    }

    showService = (services) => {
        var result = null;
        if (services && services.length > 0) {
            result = services.map((service, index) => {
                return (
                    <option value={service.roomServiceId} key={index}>{service.nameService} - {service.priceService}</option>
                );
            });
        }
        return result;
    }

    checkValidate = (e) => {
        var valiroomServiceId = true;
        var valiAmount = true;
        if (this.state.roomServiceId === '-1') {
            this.setState({
                roomServiceError: 'Vui lòng chọn loại phòng',
            });
            valiroomServiceId = false;
        }
        else {
            this.setState({
                roomServiceError: ''
            });
            valiroomServiceId = true
        }

        if (this.state.Amount === '') {
            this.setState({
                AmountError: 'Vui lòng nhập số lương',
            });
            valiAmount = false;
        }
        else if (isNaN(this.state.Amount) || this.state.Amount <= 0) {
            this.setState({
                AmountError: 'Số lượng phải là số và lớn hơn 0',
            });
            valiAmount = false;
        }
        else {
            this.setState({
                AmountError: ''
            });
            valiAmount = true
        }
        e.preventDefault();
        if (valiroomServiceId && valiAmount)
            return true;
        return false;
    }

    onAdd = async (e) => {
        if (this.checkValidate(e)) {
            // e.preventDefault();
            var utc = new Date().toLocaleString();
            let result = await callApi('contractdetail', 'POST', {
                contractId: this.state.contractId,
                roomServiceId : this.state.roomServiceId,
                amount : this.state.Amount,
                timeAdded : utc
            })
            console.log(result);
            if (result && result.data && result.data.success) {
                this.props.onHide()
                alert('Thêm thành công')
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
        var { idroom, idcontract } = this.props;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Form onSubmit={this.onAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thêm chi tiết phòng {idroom}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="container">
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Mã hóa đơn
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        name="nameRoomType"
                                        value={idcontract}
                                        type="text"
                                        readOnly />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Dịch vụ
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="select" name="roomServiceId" onChange={this.onChange}>
                                        <option defaultValue value={-1}>Chọn</option>
                                        {this.showService(this.state.service)}
                                    </Form.Control>
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.roomServiceError}</p>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Số lượng
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        onChange={this.onChange}
                                        name="Amount"
                                        value={this.state.Amount}
                                        type="text"
                                        placeholder="Nhập số lương ..." />
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.AmountError}</p>
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

export default AddDetails; 