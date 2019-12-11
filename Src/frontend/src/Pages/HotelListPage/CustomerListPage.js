import React, { Component } from 'react';
import CustomerItem from '../../Components/HotelItem/Customeritem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Customerlist from '../../Components/HotelList/Customerlist';
import AddCustomerModal from '../../Components/HotelActionModal/AddCustomerModal';
import callApi from './../../callerApi';

class CustomerListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { customers : [],addModalShow: false };
    }

    getdata = async () => {
        await callApi('customer','GET', null).then (res => {
            this.setState ({
                customers : res.data.data
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
                <Customerlist>
                    {this.showCustomer(this.state.customers)}
                </Customerlist>
                    
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm khách hàng</Button>

                            <AddCustomerModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                                getdata = {this.getdata}
                                who = "admin"
                            ></AddCustomerModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        );
    }

    showCustomer (customers) {
        var result = null;
        if (customers.length > 0) {
            result = customers.map((customer, index) => {
                return (
                    <CustomerItem
                        key={index}
                        customer={customer}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
}

export default CustomerListPage;