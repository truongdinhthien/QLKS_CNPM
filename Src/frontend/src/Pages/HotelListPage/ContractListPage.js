import React, { Component } from 'react';
import Contractlist from '../../Components/HotelList/Contractlist';
import Contractitem from '../../Components/HotelItem/Contractitem';
import callApi from './../../callerApi';
class ContractListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {contracts : []};
    }

    getdata = async () => {
        await callApi('contract','GET', null).then (res => {
            this.setState ({
                contracts : res.data.data
            })
        })
    }

    async componentDidMount (){
        await this.getdata()
    }

    render() {

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Contractlist>
                    {this.showContract(this.state.contracts)}
                </Contractlist>
            </div>
        );
    }

    showContract (contracts) {
        var result = null;
        if (contracts.length > 0) {
            result = contracts.map((contract, index) => {
                return (
                    <Contractitem
                        key={index}
                        contract={contract}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
}

export default ContractListPage;