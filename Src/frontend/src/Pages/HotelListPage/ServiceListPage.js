import React, { Component } from 'react';
import Servicelist from '../../Components/HotelList/Servicelist';
import Serviceitem from '../../Components/HotelItem/Serviceitem';
import AddServiceModal from '../../Components/HotelActionModal/AddServiceModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import callApi from './../../callerApi';
class ServiceListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { services : [],addModalShow: false };
    }
    getdata = async () => {
        await callApi('roomservice','GET', null).then (res => {
            this.setState ({
                services : res.data.data
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
                <Servicelist>
                    {this.showServices(this.state.services)}
                </Servicelist>
                
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm dịch vụ</Button>

                            <AddServiceModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                                getdata = {this.getdata}
                                what = "add"
                            ></AddServiceModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        );
    }

    showServices(services) {
        var result = null;
        if (services.length > 0) {
            result = services.map((service, index) => {
                return (
                    <Serviceitem
                        key={index}
                        service={service}
                        index={index}
                        getdata = {this.getdata}
                    />
                );
            });
        }
        return result;
    }
}

export default ServiceListPage;