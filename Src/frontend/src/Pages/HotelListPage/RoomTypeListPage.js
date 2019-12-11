import React, { Component } from 'react';
import RoomTypeList from '../../Components/HotelList/RoomTypelist';
import RoomTypeItem from '../../Components/HotelItem/RoomTypeitem';
import AddRoomTypeModal from '../../Components/HotelActionModal/AddRoomTypeModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import callApi from './../../callerApi';

export class RoomTypeListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { roomtypes : [], addModalShow: false };
    }
    
    getdata = async () => {
        await callApi('roomtype','GET', null).then (res => {
            this.setState ({
                roomtypes : res.data.data
            })
        })
    }

    async componentDidMount (){
        await this.getdata()
    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false });

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <RoomTypeList>
                    {this.showRoomType(this.state.roomtypes)}
                </RoomTypeList>
                
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm loại phòng</Button>

                            <AddRoomTypeModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                                getdata={ this.getdata }
                                what = "add"
                            ></AddRoomTypeModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        );
    }

    showRoomType(roomtypes) {
        var result = null;
        if (roomtypes && roomtypes.length > 0) {
            result = roomtypes.map((roomtype, index) => {
                return (
                    <RoomTypeItem
                        key={index}
                        roomtype={roomtype}
                        index={index}
                        getdata = {this.getdata}
                    />
                );
            });
        }
        return result;
    }
    // nhan vao nut them sp
    // modal hien len
    // nhap du lieu
    // gui du lieu di (validate soluong NUMBER >=0)
    // neu thanh cong - > goi ham getdata
    // neu that bai -> thong bao loi
}

export default RoomTypeListPage;
