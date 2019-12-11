import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddRoomTypeModal from './../HotelActionModal/AddRoomTypeModal'

class RoomTypeitem extends Component {
    constructor(props) {
        super(props);
        this.state = { addModalShow: false };
    }
    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        var { roomtype, index } = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{roomtype.roomTypeId}</td>
                <td>{roomtype.nameRoomType}</td>
                <td>{roomtype.priceRoom}</td>
                <td>
                    <ButtonToolbar>
                        <Button
                            variant="warning"
                            onClick={() => this.setState({ addModalShow: true })}
                        >Sửa</Button>

                        <AddRoomTypeModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            getdata={this.props.getdata}
                            what="edit"
                            roomtype = {roomtype}
                        ></AddRoomTypeModal>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

export default RoomTypeitem;
