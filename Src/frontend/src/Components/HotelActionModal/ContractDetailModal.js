import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import callApi from '../../callerApi';
import ContractDetailitem from './../HotelItem/ContractDetailitem';

class ContractDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractdetails: [],
            empty: '',
        }
    }
    // componentDidMount = async () => {
    //     await this.getData()
    // }

    componentWillReceiveProps = async () => {
        await this.getData()
    }

    // componentDidUpdate = async () => {
    //     await this.getData()
    // }
    getData = async () =>
    {
        var { id } = this.props;
        let result = await callApi(`contractdetail/${id}`, 'GET', null)
        if (result && result.data && result.data.success) {
            this.setState({
                contractdetails: result.data.data
            })
        } else {
            this.setState({
                empty: result.data.message
            })
        }
    }

    showContractDetail = (contractdetails) => {
        var result = null;
        if (contractdetails.length > 0 && contractdetails) {
            result = contractdetails.map((contractdetail, index) => {
                return (
                    <ContractDetailitem
                        key={index}
                        contractdetail={contractdetail}
                        index={index}
                    />
                );
            });
        }
        else return <tr><td>{this.state.empty}</td></tr>

        return result;
    }

    render() {
        var { id } = this.props;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chi tiết phòng {id}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <Form.Group as={Row} >
                            <Form.Label column sm="1.5">
                                Tìm kiếm
                                </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" placeholder="Nhập tên dịch vụ ..." />
                            </Col>
                        </Form.Group>

                        <div className="mt-3">
                            <table className="table table-striped">
                                <thead>
                                    <tr >
                                        <th scope="col"> STT </th>
                                        <th scope="col"> Mã dịch vụ </th>
                                        <th scope="col"> Số lượng </th>
                                        {/* <th scope="col"> Thành tiền </th> */}
                                        <th scope="col"> Ngày thêm </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showContractDetail(this.state.contractdetails)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ContractDetailModal;