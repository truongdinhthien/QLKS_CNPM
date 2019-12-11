import React, { Component } from 'react';

export class Billlist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã hóa đơn </th>
                            <th scope="col"> Mã phiếu</th>
                            <th scope="col"> Mã NV </th>
                            <th scope="col"> Tiền phòng </th>
                            <th scope="col"> Tiền dịch vụ </th>
                            <th scope="col"> Tổng tiền </th>
                            <th scope="col"> Hành Động </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr >
                                <td>#</td>
                                <td></td>
                                <td></td>
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

export default Billlist;
