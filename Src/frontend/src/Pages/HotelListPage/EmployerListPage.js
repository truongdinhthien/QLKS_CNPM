import React, { Component } from 'react';
import Employerlist from '../../Components/HotelList/Employerlist';
import Employeritem from '../../Components/HotelItem/Employeritem';
import AddEmployerModal from '../../Components/HotelActionModal/AddEmployerModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import callApi from './../../callerApi';

class EmployerListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { employers : [],addModalShow: false };
    }

    getdata = async () => {
        await callApi('employer','GET', null).then (res => {
            this.setState ({
                employers : res.data.data
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
                <Employerlist>
                    {this.showEmployer(this.state.employers)}
                </Employerlist>
                    
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm nhân viên</Button>

                            <AddEmployerModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                                getdata={this.getdata}
                            ></AddEmployerModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        );
    }

    showEmployer (employers) {
        var result = null;
        if (employers.length > 0) {
            result = employers.map((employer, index) => {
                return (
                    <Employeritem
                        key={index}
                        employer={employer}
                        index={index}
                        getdata={this.getdata}
                    />
                );
            });
        }
        return result;
    }
}

export default EmployerListPage;
