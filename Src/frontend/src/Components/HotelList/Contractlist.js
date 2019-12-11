import React, { Component } from 'react';

class Contractlist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã phiếu </th>
                            <th scope="col"> Mã phòng </th>
                            <th scope="col"> Mã KH </th>
                            <th scope="col"> Mã NV </th>
                            <th scope="col"> Ngày thuê </th>
                            <th scope="col"> Ngày trả </th>
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
                                <td><input className="form-control" type="datetime-local" placeholder="Nhập ngày thuê ..."></input></td>
                                <td><input className="form-control" type="datetime-local" placeholder="Nhập ngày trả ..."></input></td>
                                <td></td>
                            </tr> */}

                        {this.props.children}

                    </tbody>

                </table>
            </div>
        );
    }
}

export default Contractlist;
