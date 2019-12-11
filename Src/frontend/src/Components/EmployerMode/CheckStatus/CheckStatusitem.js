import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDetails from '../AddDetails';
import ContractDetailModal from './../../HotelActionModal/ContractDetailModal';
import CheckOutModal from '../CheckOutModal';


export class CheckStatusitem extends Component {
    constructor (props)
    {
        super(props);
        this.state = {
            contractId : '',
            addModalShowAdd: false,
            addModalShow : false,
            checkOutModalShow : false,
        }
    }
    render() {
        var { statusroom, index } = this.props;
        
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{statusroom.room.roomId}</td>
                <td>{statusroom.contractId}</td>
                <td>{statusroom.room.roomType.nameRoomType}</td>
                <td>{statusroom.room.roomType.priceRoom}</td>
                <td>{statusroom.room.status}</td>
                <td>
                    {this.showActions(statusroom.room.status,statusroom.room.roomId,statusroom.contractId)}
                </td>
            </tr>


        );
    }
    changeStatus = () => {
        this.setState({ statusroom : "Trống" })
    }

    showActions(status,id,idcontract) {
        let addModalShowAdd = () => this.setState({ addModalShowAdd: false });
        let addModalShow = () => this.setState ({addModalShow : false})
        let checkOutModalShow = () => this.setState ({checkOutModalShow : false})
        if (status === "Trống")
            return (
                <div>
                    <Link to={`/employer-mode/${id}/rent-room`} className="btn btn-link">Đặt phòng</Link>
                </div>
        )
        else return (
            <div>
                <ButtonToolbar>
                        <Button
                            variant="link"
                            onClick={() => this.setState({ addModalShowAdd: true })}
                        >Thêm dịch vụ</Button>

                        <AddDetails
                            show={this.state.addModalShowAdd}
                            onHide={addModalShowAdd}
                            idcontract = {idcontract}
                            idroom = {id}
                        ></AddDetails>
                    </ButtonToolbar>
                <ButtonToolbar>
                        <Button
                            variant="link"
                            onClick={() => this.setState({ addModalShow: true })}
                        >Xem Chi Tiết</Button>

                        <ContractDetailModal
                            show={this.state.addModalShow}
                            onHide={addModalShow}
                            id = {idcontract}
                        ></ContractDetailModal>
                </ButtonToolbar>
                <ButtonToolbar>
                        <Button
                            variant="link"
                            onClick={() => this.setState({ checkOutModalShow: true })}
                        >Trả phòng</Button>

                        <CheckOutModal
                            show={this.state.checkOutModalShow}
                            onHide={checkOutModalShow}
                            idcontract = {idcontract}
                            idroom = {id}
                            // changeStatus = {() => this.setState({ statusroom : "Trống" })}
                            // changeStatus = {this.changeStatus}
                            getdata = {this.props.getdata}
                        ></CheckOutModal>
                </ButtonToolbar>
            </div>
        )
    }
}

export default CheckStatusitem;
