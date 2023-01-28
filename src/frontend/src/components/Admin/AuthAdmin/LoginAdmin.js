import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import './LoginAdmin.scss';
import 'bootstrap'
import LogoShop from '../../../assets/images/PickBazar.png';
import adminService from '../../../services/adminService';

class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modal: false,
            isShowUserOption: false,
            isShowPassword: false,
            err: 4,
            message: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
            message: ''
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
            message: ''
        })
    }

    handleLogin = async () => {
        let userName = this.state.username
        let passWord = this.state.password
        let data = await adminService.login(userName, passWord)
        console.log(data)
        if (data.err !== 4) {
            this.setState({
                err: data.err,
                message: data.message
            })
        }
        else {
            //Thanh cong
            // this.props.processLogout()
            this.props.adminLoginSuccess(data.store)
            let { navigate } = this.props;
            //const redirectPath = '/system/user-manage';
            navigate('/admin');
        }

    }

    componentDidMount() {
        this.props.changeAppMode('adminMode')      
    }

    render() {
        //JSX

        return (
            <>
                <div className='login-admin' >

                    <div className='login-container' >
                        <div className='login-content'>
                            <div className='col-12  text-login'>
                                <img src={LogoShop} className='login-logo' />
                            </div>
                            <div className='col-12 text-contentlogin'>
                                Register as Shop
                            </div>


                            <div className='col-12 form-group login-input'>
                                <label>
                                    <span>Store name</span></label>
                                <input type='email' className='form-control login-input--text' placeholder='Enter your store name'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label className='login-input-password'>
                                    <span>Phone</span>
                                    {/* <span className='forgot-password'>Forgot password?</span> */}
                                </label>
                                <div className='custom-input-password'>
                                    <input type={'text'} className='form-control login-input--text' placeholder='Enter your phone'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                    />
                                    {/* <span
                                        onClick={() => this.setState({
                                            isShowPassword: !this.state.isShowPassword,
                                        })}
                                    >
                                        <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                    </span> */}
                                </div>
                            </div>
                            <button className='btn-login btn-login-normal' onClick={() => this.handleLogin()}
                            >Login</button>
                            <div className='col-12'>
                                <span style={{ color: 'red' }}>{this.state.message}</span>
                            </div>
                            {/* <div className='col-12  login-orther'>
                                <span className='text-orther-login '>
                                    <span>Or</span>
                                </span>

                            </div>

                            <div className='login-register-user '>
                                <span>Don't have any account? </span>
                                <a>Register as Shop</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
        processLogout: () => dispatch(actions.processLogout()),
        changeAppMode: (payload) => dispatch(actions.changeAppMode(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);