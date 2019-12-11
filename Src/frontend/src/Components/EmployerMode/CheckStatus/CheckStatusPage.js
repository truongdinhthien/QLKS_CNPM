import React, { Component } from 'react';
import CheckStatusList from './CheckStatuslist';
import CheckStatusItem from './CheckStatusitem';
import callApi from './../../../callerApi';

export class CheckStatusPage extends Component {

    constructor(props) {
        super(props);
        this.state = {statusrooms : []};
    }

    async componentDidMount (){
        await this.getdata()
    }

    getdata = async () => {
        await callApi('rentroom','GET', null).then (res => {
            this.setState ({
                statusrooms : res.data.data
            })
        })
        console.log(this.state.statusrooms)
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <CheckStatusList>
                    {this.showRoom(this.state.statusrooms)}
                </CheckStatusList>
            </div>
        );
    }

    showRoom(statusrooms) {
        var result = [];
        if (statusrooms && statusrooms.length > 0) {
            result = statusrooms.map((statusroom, index) => {
                console.log(statusroom)
                return (
                    <CheckStatusItem
                        key={index}
                        statusroom={statusroom}
                        index={index}
                        getdata = {this.getdata}
                    />
                );

            });
        }
        return result;
    }
}

export default CheckStatusPage;