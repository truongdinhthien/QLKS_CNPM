import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddServiceModal from './../HotelActionModal/AddServiceModal';

class Serviceitem extends Component {
    constructor(props) {
        super(props);
        this.state = { addModalShow: false };
    }
    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        var {service,index} = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{service.roomServiceId}</td>
                <td>{service.nameService}</td>
                <td>{service.priceService}</td>
                <td>
                <ButtonToolbar>
                        <Button
                            variant="warning"
                            onClick={() => this.setState({ addModalShow: true })}
                        >Sửa</Button>

                        <AddServiceModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            getdata={this.props.getdata}
                            what="edit"
                            service = {service}
                        ></AddServiceModal>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

export default Serviceitem;