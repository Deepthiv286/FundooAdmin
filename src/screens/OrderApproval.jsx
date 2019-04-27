/****************************************************************************
 * 
 * Purpose : To design an order approval page
 * 
 * @description
 * @file : OrderApproval.jsx
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 27/04/2019
 * 
 ****************************************************************************/
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { getCartList, approveOrder, rejectOrder } from '../services/service';
/**
 * import required files
 */
export default class OrderApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
        }
    }
    componentDidMount() {
        getCartList()
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    cartList: res.data.data
                })
            }).catch(err => {
                console.log(err.message);
            })
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
     * to approve order
     */
    handleApprove = (id) => {
        try {
            console.log(id);
            const data = { cartId: id };
            approveOrder(data)
                .then(res => {
                    console.log(res);
                    let newCart = this.state.cartList;
                    for (let i = 0; i < newCart.length; i++) {
                        if (newCart[i].id === id)
                            newCart.splice(i, 1);
                        this.setState({
                            cartList: newCart
                        })
                    }
                    console.log(this.state.cartList);
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
     * to reject order
     */
    handleReject = (id) => {
        try {
            console.log(id);
            const data = { cartId: id };
            rejectOrder(data)
                .then(res => {
                    console.log(res);
                    let newCart = this.state.cartList;
                    for (let i = 0; i < newCart.length; i++) {
                        if (newCart[i].id === id)
                            newCart.splice(i, 1);
                        this.setState({
                            cartList: newCart
                        })
                    }
                    console.log(this.state.cartList);
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    render() {
        const { cartList } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#003366', padding: '10px 20px 10px 20px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '2em', color: '#fff' }}>FundooAdmin</div>
                    <div style={{ fontSize: '2em', marginLeft: '380px', color: '#fff' }}>Orders</div>
                    <div style={{ marginLeft: '490px', marginTop: '5px' }}><Button variant="contained" onClick={this.handleDashboard}>Back</Button></div>
                </div>
                <table className='table table-bordered'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Service</th>
                            <th scope="col">Price</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cartList).reverse().map((key, i) => (
                                <tr key={key}>
                                    {cartList[i].user !== undefined ?
                                        <td>
                                            {cartList[i].user.firstName}
                                        </td>
                                        : null
                                    }
                                    {cartList[i].user !== undefined ? <td>
                                        {cartList[i].user.addresses[0].address}
                                    </td>
                                        : null
                                    }
                                    {cartList[i].user !== undefined ? <td>
                                        {cartList[i].product.name}
                                    </td>
                                        : null
                                    }
                                    {cartList[i].user !== undefined ? <td>
                                        {cartList[i].price}
                                    </td>
                                        : null
                                    }
                                    {cartList[i].user !== undefined ? <td>
                                        <Button variant="contained" onClick={() => { this.handleApprove(cartList[key].id) }}>Approve</Button>
                                    </td>
                                        : null
                                    }
                                    {cartList[i].user !== undefined ? <td>
                                        <Button variant="contained" onClick={() => { this.handleReject(cartList[key].id) }}>Reject</Button>
                                    </td>
                                        : null
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}