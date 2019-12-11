import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from './../../callerApi';

export class AddRoomModal extends Component {

    constructor(props) {
        super(props);
        if(this.props.what === "add")
        {
            this.state = {
                validated: false,
                nameroomtypes: [{}],
                roomId: '',
                roomTypeId: '-1',
                roomIdError: '',
                roomTypeIdError: ''
            }
        }
        if(this.props.what === "edit")
        {
            this.state = {
                validated: false,
                nameroomtypes: [{}],
                roomId: this.props.room.roomId,
                roomTypeId: '-1',
                roomIdError: '',
                roomTypeIdError: ''
            }
        }
        
    }

    checkValidate(e) {
        var roomIdVali = true;
        var roomTypeIdVali = true;
        var regex = new RegExp("^P[0-9]{3}$")
        if (this.state.roomId === '') {
            this.setState({
                roomIdError: 'Vui lòng nhập tên phòng'
            });
            roomIdVali = false;
        }
        else if (!this.state.roomId.match(regex)) {
            this.setState({
                roomIdError: 'Mã phòng không hợp lệ. Mã hợp lệ bắt đầu bằng P và kết thúc bằng ba số. Ví dụ : P101,P202'
            });
            roomIdVali = false;
        }

        if (roomIdVali === true) {

            this.setState({
                roomIdError: '',
            });
        }

        if (this.state.roomTypeId === '-1') {
            this.setState({
                roomTypeIdError: 'Vui lòng chọn loại phòng',
            });
            roomTypeIdVali = false;
        }
        if (roomTypeIdVali === true) {

            this.setState({
                roomTypeIdError: ''
            });
        }
        e.preventDefault();
        if (roomTypeIdVali && roomIdVali) {
            return true;
        }
        return false;
    }

    onAdd = async (e) => {
        if (this.checkValidate(e)) {
            e.preventDefault();
            if(this.props.what === "add")
            {
                let result = await callApi('room', 'POST', {
                    roomId: this.state.roomId,
                    roomTypeId: this.state.roomTypeId,
                    status: 'Trống'
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Thêm thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        roomIdError: result.data.message
                    })
                }
            }
            if(this.props.what === "edit")
            {
                let result = await callApi(`room/${this.state.roomId}`, 'PUT', {
                    roomTypeId: this.state.roomTypeId,
                    status: 'Trống'
                })
                console.log(result);
                if (result && result.data && result.data.success) {
                    this.props.onHide()
                    alert('Sửa thành công')
                    this.props.getdata()
                } else {
                    this.setState({
                        roomIdError: result.data.message
                    })
                }
            }
            
        }
    }

    async componentDidMount() {
        await callApi('roomtype', 'GET', null).then(res => {
            let nameroomtypesCopy = JSON.parse(JSON.stringify(this.state.nameroomtypes))
            nameroomtypesCopy = res.data.data;
            this.setState({
                nameroomtypes: nameroomtypesCopy
            })
        })
        console.log(this.props.getdata);
    }

    showName = (nameroomtypes) => {
        var result = null;
        if (nameroomtypes && nameroomtypes.length > 0) {
            result = nameroomtypes.map((nameroomtype, index) => {
                return (
                    <option value={nameroomtype.roomTypeId} key={index}>{nameroomtype.nameRoomType}</option>
                );
            });
        }
        return result;
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    whatShow = (what) => {
        if (what === "add") {
            return(
                <>
                <Form.Control type="text" value={this.state.roomId} name="roomId" placeholder="Nhập tên phòng ..." onChange={this.onChange} />
                <div className="panel panel-default">
                    <p className="text-danger">{this.state.roomIdError}</p>
                </div>
                </>
            )
        }
        if(what === "edit")
        {
            return (
                <>
                <Form.Control type="text" value={this.state.roomId} name="roomId" placeholder="Nhập tên phòng ..." readOnly />
                <div className="panel panel-default">
                    <p className="text-danger">{this.state.roomIdError}</p>
                </div>
                </>
            )
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
                            Thêm phòng
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Mã phòng (*)
                            </Form.Label>
                                <Col sm="10">
                                    {this.whatShow(this.props.what)}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Mã Loại phòng
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="select" name="roomTypeId" onChange={this.onChange}>
                                        <option defaultValue value={-1}>Chọn</option>
                                        {this.showName(this.state.nameroomtypes)}
                                    </Form.Control>
                                    <div className="panel panel-default">
                                        <p className="text-danger">{this.state.roomTypeIdError}</p>
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

export default AddRoomModal;
