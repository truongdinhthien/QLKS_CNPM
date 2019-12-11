import React, { Component } from 'react';
import callApi from './../../../callerApi';

class CheckStatuslist extends Component {
    constructor(props) {
        super(props);
        this.state = {  nameroomtypes : [{}],
                        roomstatus : []};
    }
    async componentDidMount (){
        await callApi('roomtype','GET', null).then (res => {
            let nameroomtypesCopy = JSON.parse(JSON.stringify(this.state.nameroomtypes))
            nameroomtypesCopy = res.data.data;
            this.setState ({
                nameroomtypes : nameroomtypesCopy
            })
            // console.log(this.state.nameroomtypes)
        })
        
    }
     showName = (nameroomtypes) => {
        var result = null;
        if (nameroomtypes && nameroomtypes.length > 0)
        {
            result = nameroomtypes.map((nameroomtype, index) => {
                return (
                    <option value = {nameroomtype.roomTypeId} key = {index}>{nameroomtype.nameRoomType}</option>
                );
            });
        }
        return result;
    }

    onChange = (e) => {
        var target = e.target;
        //var name = target.name;
        var value = target.value;
        console.log(value);
    }
    render() {
        return (
            <div>
                <div className="mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr >
                                <th scope="col"> STT </th>
                                <th scope="col"> Mã phòng </th>
                                <th scope="col"> Mã Phiếu </th>
                                <th scope="col"> Loại phòng </th>
                                <th scope="col"> Giá </th>
                                <th scope="col"> Tình trạng </th>
                                <th scope="col"> Hành Động </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>#</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <select className="custom-select" onChange = {this.onChange}>
                                        <option defaultValue value = {0}>Tất cả</option>
                                        {this.showName(this.state.nameroomtypes)}
                                    </select>
                                </td>
                                <td></td>
                                <td>
                                    <select className="custom-select">
                                        <option defaultValue> Tất cả </option>
                                        <option value={1} > Trống </option>
                                        <option value={2} > Có người </option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>

                            {this.props.children}

                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default CheckStatuslist;