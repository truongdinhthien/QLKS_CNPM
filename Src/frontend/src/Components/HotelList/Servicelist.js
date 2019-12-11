import React, { Component } from 'react';

class Servicelist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã dịch vụ </th>
                            <th scope="col"> Tên dịch vụ </th>
                            <th scope="col"> Giá </th>
                            <th scope="col"> Hành Động </th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.children}

                    </tbody>

                </table>
            </div>
        );
    }
}

export default Servicelist;