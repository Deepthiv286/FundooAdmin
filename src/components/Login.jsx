/****************************************************************************
 * 
 * Purpose : To design a login page
 * 
 * @description
 * @file : Login.jsx
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 10/04/2019
 * 
 ****************************************************************************/
import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import successMsg from '../config/repository/success';
import errorMsg from '../config/repository/error';
import { InputAdornment, IconButton, Card } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { adminLogin } from '../services/service';
import '../scss/login.scss'
/**
 * importing required files
 */
export default class LoginPage extends Component {
    /**
     * creating a login page with required components
     */
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            open: false,
            msg: "",
            formErrors: {
                email: "",
                password: ""
            },
        };
    }
    /**
     * to handle change states
     */
    handleChange = name => event => {
        try {
            this.setState({ [name]: event.target.value });
        }
        catch (err) {
            console.log(err.message);

        }
    };
    /**
     * handles toggling of password
     */
    handleClickShowPassword = () => {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        }
        catch (err) {
            console.log(err, "error in handle click password  in login");

        }
    }
    /**
     * handles submission of login
     */
    handleSubmit = event => {
        try {
            event.preventDefault();
            let verifyEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);
            if (this.state.email === '') {
                this.setState({ open: true, msg: errorMsg.emptyEmail });
            }
            else if (!verifyEmail) {
                this.setState({ open: true, msg: errorMsg.validEmail });
            }
            else if (this.state.password === '') {
                this.setState({ open: true, msg: errorMsg.emptyPassword });
            }
            else {
                let data = {
                    email: this.state.email,
                    password: this.state.password
                }
                console.log("Data in login page : " + data.email);
                adminLogin(data)
                    .then((response) => {
                        /**
                         * handle success
                         */
                        console.log(response.data);

                        this.setState({
                            open: true,
                            msg: successMsg.loginSuccess
                        });
                        this.props.history.push('/dashBoard');
                    })
                    .catch((err) => {
                        /**
                         * handle error
                         */
                        console.log(err);
                        this.setState({
                            open: true,
                            msg: errorMsg.loginFailed
                        });
                    });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
     * handles close event
     */
    handleClose = () => {
        try {
            this.setState({ open: false });
        } catch (error) {
            console.log(error.message);
        }
    };
    render() {
        return (
            <div id="loginResponsive">
                <Card className="LoginForm">
                    <div id="header">
                        <span id="F">F</span>
                        <span id="u">u</span>
                        <span id="n">n</span>
                        <span id="d">d</span>
                        <span id="o">o</span>
                        <span id="oo">o</span>
                        <span id="F">A</span>
                        <span id="u">d</span>
                        <span id="n">m</span>
                        <span id="d">i</span>
                        <span id="o">n</span>
                    </div>
                    <div id="belowHeader">
                        <span id="S">Sign in</span>
                        <p id="w">with your Fundoo Account</p>
                    </div>
                    <div id="emailInput">
                        <TextField
                            type="email"
                            variant="outlined"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            label="Email"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <MailIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div id="passwordInput">
                        <TextField
                            type={this.state.showPassword ? 'text' : 'password'}
                            id="password"
                            variant="outlined"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            label="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div id="link1">
                        <Button
                            size="small"
                            color="primary"
                            onClick={this.handleForgotPassword}>
                            Forgot password?
                        </Button>
                    </div>
                    <div id="btn">
                        <Button
                            size="small"
                            variant="contained"
                            title="Click on submit"
                            color="primary"
                            value="click me"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                    <div id="link2" >
                        <Button
                            size="small"
                            color="primary"
                            onClick={this.handleRegister}>
                            Create account
                        </Button>
                    </div>
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={3500}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                        {this.state.msg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}
