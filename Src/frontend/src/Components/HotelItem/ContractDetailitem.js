import React, { Component } from 'react';

class ContractDetailitem extends Component {
    render() {
        var { contractdetail, index } = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{contractdetail.roomService.nameService}</td>
                <td>{contractdetail.amount}</td>
                <td>{contractdetail.timeAdded}</td>
            </tr>
        );
    }
}

export default ContractDetailitem;