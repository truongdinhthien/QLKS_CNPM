import React, { Component } from 'react';
import Billlist from '../../Components/HotelList/Billlist';
import Billitem from '../../Components/HotelItem/Billitem';
import callApi from './../../callerApi';
export class BillListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {bills : []};
    }

    getdata = async () => {
        await callApi('bill','GET', null).then (res => {
            this.setState ({
                bills : res.data.data
            })
        })
    }

    async componentDidMount (){
        await this.getdata()
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Billlist>
                    {this.showBill(this.state.bills)}
                </Billlist>
            </div>
        );
    }

    showBill (bills) {
        var result = null;
        if (bills.length > 0) {
            result = bills.map((bill, index) => {
                return (
                    <Billitem
                        key={index}
                        bill={bill}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
}

export default BillListPage;
