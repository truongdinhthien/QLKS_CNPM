import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddRoomModal from './../HotelActionModal/AddRoomModal'

class Roomitem extends Component {
    constructor(props) {
        super(props);
        this.state = { addModalShow: false };
    }
    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        var {room,index} = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{room.roomId}</td>
                <td>{room.roomType.nameRoomType}</td>
                <td>{room.roomType.priceRoom}</td>
                <td>{room.status}</td>
                <td>
                <ButtonToolbar>
                        <Button
                            variant="warning"
                            onClick={() => this.setState({ addModalShow: true })}
                        >Sửa</Button>

                        <AddRoomModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            getdata={this.props.getdata}
                            what="edit"
                            room = {room}
                        ></AddRoomModal>
                    </ButtonToolbar>
                </td>
            </tr>
            

        );
    }
}

export default Roomitem;