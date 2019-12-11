import React, { Component } from 'react';

export class Billitem extends Component {
    render() {
        var {bill,index} = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{bill.billId}</td>
                <td>{bill.contractId}</td>
                <td>{bill.employer.fullName}</td>
                <td>{bill.priceRentRoom}</td>
                <td>{bill.priceTotalService}</td>
                <td>{bill.totalPrice}</td>
                <td>
                    {/* <button type="button" className="btn btn-link">Xem chi tiết</button> */}
                    ...
                </td>
            </tr>
        );
    }
}

export default Billitem;
