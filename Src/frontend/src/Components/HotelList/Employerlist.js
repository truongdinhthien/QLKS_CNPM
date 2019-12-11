import React, { Component } from 'react';

class Employerlist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã nhân viên </th>
                            <th scope="col"> Tên nhân viên </th>
                            <th scope="col"> Số điện thoại </th>
                            <th scope="col"> Địa chỉ </th>
                            <th scope="col"> Giới tính </th>
                            <th scope="col"> Quyền hạn </th>
                            <th scope="col"> Kích hoạt </th>
                            <th scope="col"> Hành Động </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr >
                                <td>#</td>
                                <td></td>
                                <td>
                                    <input className="form-control" type="text" placeholder="Tìm tên nhân viên ..."></input>
                                </td>
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

export default Employerlist;
