import React, { Component } from 'react';
import callApi from './../../callerApi'

class Employeritem extends Component {
    render() {
        var { employer, index } = this.props;
        return (
            <tr >
                <td>{index + 1}</td>
                <td>{employer.employerId}</td>
                <td>{employer.fullName}</td>
                <td>{employer.phoneNumber}</td>
                <td>{employer.address}</td>
                <td>{employer.gender}</td>
                <td>{employer.role}</td>
                <td>{employer.active}</td>
                <td>
                    {this.showMenu(employer.employerId,employer.active)}
                </td>
            </tr>
        );
    }

    showMenu(id,active) {
        if (active === "Active") {
            return (
                <div className="d-flex align-content-start flex-wrap">
                    <button type="button" className="btn btn-primary m-1" onClick={()=>this.change(id)}>Block</button>
                </div>
            )
        }
        else {
            return (
                <div className="d-flex align-content-start flex-wrap">
                    <button type="button" className="btn btn-primary m-1" onClick={()=>this.change(id)}>Active</button>
                </div>
            )
        }
    }

    async change(id) {
        let result = await callApi('changeactive', 'POST', {
            employerId : id
        })
        console.log(result);
        if (result && result.data && result.data.success) {
            alert('Thao tác thành công')
            this.props.getdata()
        }
    }
}

export default Employeritem;
