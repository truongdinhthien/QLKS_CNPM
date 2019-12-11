import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import ContractDetailModal from './../../Components/HotelActionModal/ContractDetailModal';

class Contractitem extends Component {
    constructor(props) {
        super(props);
        this.state = { addModalShow: false }
    }
    render() {
        var { contract, index } = this.props;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{contract.contractId}</td>
                <td>{contract.roomId}</td>
                <td>{contract.customer.fullName}</td>
                <td>{contract.employer.fullName}</td>
                <td>{contract.dateIn}</td>
                <td>{contract.dateOut}</td>
                <td>
                    <ButtonToolbar>
                        <Button
                            variant="primary"
                            onClick={() => this.setState({ addModalShow: true })}
                        >Xem CT</Button>

                        <ContractDetailModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            id = {contract.contractId}
                        ></ContractDetailModal>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

export default Contractitem;
