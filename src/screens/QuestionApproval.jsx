/****************************************************************************
 * 
 * Purpose : To approve or reject questions
 * 
 * @description
 * @file : QuestionApproval.jsx
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 12/04/2019
 * 
 ****************************************************************************/
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import '../scss/qa.scss';
import { unapprovedQA, approveAnswer, rejectAnswer } from '../services/service';
/**
 * import required files
 */
export default class QuestionApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ques: ''
        }
    }
    componentDidMount() {
        try {
            unapprovedQA()
                .then(res => {
                    console.log(res.data.data);
                    this.setState({
                        ques: res.data.data
                    })
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
     * to go back to dashboard
     */
    handleDashboard = () => {
        try {
            this.props.history.push('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
     * to approve answer
     */
    handleApprove = (id) => {
        try {
            console.log(id);
            const parentId = id;
            approveAnswer(parentId)
                .then(res => {
                    console.log(res);
                    let newQues = this.state.ques;
                    for (let i = 0; i < newQues.length; i++) {
                        if (newQues[i].id === id)
                            newQues.splice(i, 1);
                        this.setState({
                            ques: newQues
                        })
                    }
                    console.log(this.state.ques);
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
     * to reject answer
     */
    handleReject = (id) => {
        try {
            console.log(id);
            const parentId = id;
            rejectAnswer(parentId)
                .then(res => {
                    console.log(res);
                    let newQues = this.state.ques;
                    for (let i = 0; i < newQues.length; i++) {
                        if (newQues[i].id === id)
                            newQues.splice(i, 1);
                        this.setState({
                            ques: newQues
                        })
                    }
                    console.log(this.state.ques);
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#003366', padding: '10px 20px 10px 20px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '2em', color: '#fff' }}>FundooAdmin</div>
                    <div style={{ fontSize: '2em', marginLeft: '290px', color: '#fff' }}>Question and Answers</div>
                    <div style={{ marginLeft: '340px', marginTop: '5px' }}><Button variant="contained" onClick={this.handleDashboard}>Back</Button></div>
                </div>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Sl.no</th>
                            <th scope="col">Questions</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.ques).reverse().map((key, i) => (
                            <tr key={key}>
                                <th scope="row">{i + 1}</th>
                                <td dangerouslySetInnerHTML={{ __html: this.state.ques[key].message }}></td>
                                <td><Button variant="contained" onClick={() => { this.handleApprove(this.state.ques[key].id) }}>Approve</Button></td>
                                <td><Button variant="contained" onClick={() => { this.handleReject(this.state.ques[key].id) }}>Reject</Button></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}