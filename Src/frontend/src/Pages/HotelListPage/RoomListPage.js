import React, { Component } from 'react';
import Roomlist from '../../Components/HotelList/Roomlist';
import Roomitem from '../../Components/HotelItem/Roomitem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddRoomModal from '../../Components/HotelActionModal/AddRoomModal';
import callApi from './../../callerApi';

export class RoomListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { rooms: [], addModalShow: false };
    }

    async componentDidMount (){
        await this.getdata()
    }

    getdata  = async () => {
        await callApi('room','GET', null).then (res => {
            this.setState ({
                rooms : res.data.data
            })
        })
    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false });

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Roomlist>
                    {this.showRoom(this.state.rooms)}
                </Roomlist>

                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm phòng</Button>

                            <AddRoomModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                                getdata={ this.getdata }
                                what = "add"
                            ></AddRoomModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        );
    }

    showRoom(rooms) {
        var result = [];
        if (rooms && rooms.length > 0) {
            result = rooms.map((room, index) => {
                return (
                    <Roomitem
                        key={index}
                        room={room}
                        index={index}
                        getdata = {this.getdata}
                    />
                );

            });
        }
        return result;
    }
}

export default RoomListPage;
