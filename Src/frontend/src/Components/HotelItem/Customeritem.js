import React, { Component } from 'react';

class Customeritem extends Component {
    render() {
        var {customer,index} = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{customer.customerId}</td>
                <td>{customer.fullName}</td>
                <td>{customer.cmnd}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>{customer.gender}</td>
                <td>
                    <button type="button" className="btn btn-warning m-1">Sửa</button>
                    <button type="button" className="btn btn-danger m-1">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default Customeritem;
