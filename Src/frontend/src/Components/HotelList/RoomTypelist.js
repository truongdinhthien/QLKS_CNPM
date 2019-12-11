import React, { Component } from 'react';

class RoomTypelist extends Component {
    render() {
        return (
            <div className="mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col"> STT </th>
                            <th scope="col"> Mã loại phòng </th>
                            <th scope="col"> Loại phòng </th>
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

export default RoomTypelist;