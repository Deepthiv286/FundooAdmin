/****************************************************************************
 * 
 * Purpose : To design a dashboard
 * 
 * @description
 * @file : DashBoard.jsx
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 11/04/2019
 * 
 ****************************************************************************/
import React, { Component } from 'react';
import { adminList } from '../services/service';
import '../scss/dashboard.scss';
import { Button, Tooltip, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
/**
 * import required files
 */
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            advance: 0,
            basic: 0
        }
    }
    componentDidMount() {
        adminList()
            .then(res => {
                console.log("User's List : ", res.data.data.data);
                this.setState({
                    users: res.data.data.data
                })
                this.users = res.data.data.data;
                this.users.forEach(element => {
                    if (element.service === 'advance') {
                        this.setState({ advance: this.state.advance + 1 })
                    }
                    else {
                        this.setState({ basic: this.state.basic + 1 })
                    }
                });
            }).catch(err => {
                console.log(err.message);
            })
    }
    handleQues = () => {
        try {
            this.props.history.push('/QuesApproval');
        } catch (error) {
            console.log(error.message);
        }
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#003366', padding: '10px 20px 10px 20px' }}>
                    <div style={{ fontSize: '2em', paddingTop: '15px',color:'#fff' }}>FundooAdmin</div>
                    <div>
                        <div style={{ fontSize: '1.2em', marginLeft: '335px',color:'#fff' }}>Admin Users List</div>
                        <div className="search">

                            <div className="searchIcon">
                                <Tooltip title="Search">
                                    <SearchIcon />
                                </Tooltip>
                            </div>
                            <div className="searchField">
                                <InputBase
                                    id="searchInputBase"
                                    value={this.state.searchNote}
                                    onChange={this.handleSearchBar}
                                    placeholder="Search"
                                    className="inputRoot"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: '300px',paddingTop:'20px' }}><Button variant="contained" onClick={this.handleQues}>Ques</Button></div>
                </div>
                <div className="row text-center justify-content-center mcard">
                    <div className="col-sm-4 col-lg-3">
                        <div className="card advance">
                            <div className="card-header">
                                <h5>Advance Users </h5>
                            </div>
                            <div className="card-body">{this.state.advance}</div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-3">
                        <div className="card basic">
                            <div className="card-header">
                                <h5>Basic Users</h5>
                            </div>
                            <div className="card-body">{this.state.basic}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}