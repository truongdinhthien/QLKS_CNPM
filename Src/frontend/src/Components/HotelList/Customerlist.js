import React, { Component } from 'react';

class Customerlist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã khách hàng </th>
                            <th scope="col"> Tên khách hàng </th>
                            <th scope="col"> Số CMND </th>
                            <th scope="col"> Số điện thoại </th>
                            <th scope="col"> Địa chỉ </th>
                            <th scope="col"> Giới tính </th>
                            <th scope="col"> Hành Động </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr >
                                <td>#</td>
                                <td></td>
                                <td>
                                    <input className="form-control" type="text" placeholder="Tìm tên khách hàng ..."></input>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> */}

                        {this.props.children}

                    </tbody>

                </table>
            </div>
        );
    }
}

export default Customerlist;