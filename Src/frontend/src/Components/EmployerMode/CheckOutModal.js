import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import callApi from './../../callerApi'
class CheckOutModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogin : [],
        }
    }
    componentDidMount = async () => {
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

    onAdd = async (e) => {
            e.preventDefault();
            let result = await callApi('bill', 'POST', {
                employerId : this.state.dataLogin.employerId,
                contractId : this.props.idcontract
            })
            console.log(result);
            if (result && result.data && result.data.success) {
                this.props.onHide()
                alert('Xuất hóa đơn thành công')
                this.props.getdata()
            } else {
                console.log("Thêm thất bại");
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
                            Trả phòng : {this.props.idroom}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">
                            Xác nhận trả phòng 
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Nhân viên : {this.state.dataLogin.fullName}
                        </Modal.Title>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default CheckOutModal;