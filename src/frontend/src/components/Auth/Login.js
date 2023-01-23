import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ViewProduct from '../Product/ViewProduct';
import { handleLogin } from '../../services/userService'
import 'bootstrap'
import LogoShop from '../../assets/images/PickBazar.png';
import {
    Link,
    withRouter
} from "react-router-dom";
import Register from './Register'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = (handleLogin) => ({
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            firebase.auth().currentUser.getIdToken(false).then(function (idToken) {
                localStorage.setItem('token', idToken);
            }).catch(function (error) {
                // Handle error
            });
            const userInfo = {
                id: authResult.user.uid,
                email: authResult.user.email,
                name: authResult.user.displayName,
                picture: authResult.user.photoURL,
            };
            handleLogin(userInfo);
            return false;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modal: false,
            errMessage: '',
            isShowUserOption: false,
            isShowPassword: false,

            isShowModalForgotPassword: false,
            isShowModalRegister: false,
        }
    }
    handleShowLogin = () => {
        this.setState({
            modal: !this.state.modal,
            isShowModalForgotPassword: false,
            isShowModalRegister: false,
        });
    };
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        //console.log(event.target.value);

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        //console.log(event.target.value);

    }
    
    handleUserLogin = async (userInfo) => {
        this.props.adminProcessLogout()
        this.props.userLoginSuccess(userInfo)
        this.setState({
            modal: !this.state.modal
        })
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    hanldeShowUserOption = () => {
        this.setState({
            isShowUserOption: !this.state.isShowUserOption
        })
    }

    handleLogoutButton = () => {
        this.props.processLogout()
    }

    handleOnMouseOut = () => {
        this.setState({
            isShowUserOption: false

        })
    }

    handleShowModalForgotPassword = () => {
        console.log('Check forgot password')
        this.setState({
            isShowModalForgotPassword: !this.state.isShowModalForgotPassword,

        })
    }
    handleShowModalRegister = () => {
        console.log('Check forgot Register')

    }
    handleShowModalLogin = () => {
        console.log('Check login')
    }


    render() {
        //JSX


        return (
            <>
                <div >
                    {this.props.isLoggedIn
                        ?
                        <>
                            <div className='dropdown-container' onMouseOver={() => this.hanldeShowUserOption()} onMouseOut={() => this.handleOnMouseOut()}>
                                <div className='dropdown-btn' >
                                    <img
                                        src={this.props.userInfo.picture} alt="Avatar" className='dropdown-btn--avatar'
                                    // alt="https://pickbazar-react-rest.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fsrc%2Fassets%2Fplaceholders%2Favatar.2a4ed68cad8ebe21317b04e155b6b245.svg&w=1920&q=75"
                                    />
                                </div>
                                <div className={this.state.isShowUserOption ? 'dropdown-box' : 'dropdown-box display-none'}>

                                    <div className='dropdown-username'>
                                        {this.props.userInfo.name}
                                    </div>
                                    <Link to='/profile' className='dropdown-item'>
                                        Profile
                                    </Link>
                                    <Link to='/my-order' className='dropdown-item'>
                                        My orders
                                    </Link>
                                    <div className='dropdown-item' onClick={() => this.handleLogoutButton()}>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: '50px', height: '30px', fontSize: '14px', backgroundColor: '#009F7F' }}
                            onClick={() => this.handleShowLogin()} >
                            Login
                        </button>}
                    <Modal
                        funk='true' isOpen={this.state.modal}
                        toggle={() => this.setState({ modal: !this.state.modal })}
                        centered
                    >
                        {!this.state.isShowModalForgotPassword ?
                            <div className='login-background' >
                                <div className='login-container' >
                                    <div className='login-content'>
                                        <div className='col-12  text-login'>
                                            <img src={LogoShop} className='login-logo' />
                                        </div>
                                        <div className='col-12 social-login'>
                                            <StyledFirebaseAuth 
                                                uiConfig={uiConfig(this.handleUserLogin)}
                                                firebaseAuth={firebase.auth()}
                                            />
                                            {/* <button className='btn-login btn-login--mobile'>
                                                <i className="fas fa-mobile-alt social-login-icon"></i>
                                                Login with Mobile number
                                            </button> */}
                                        </div>
                                        <div className='col-12  login-line'></div>
                                    </div>
                                </div>

                            </div>
                            :

                            <div className='container-forgotPassword'>
                                <div className='forgotPassword-logo' ><img src={LogoShop} /></div>
                                <h3 className='forgotPassword__header'>
                                    Forget Password?

                                </h3>
                                <div className='forgotPassword__body'>
                                    <span>Relax and try to remmember your password.</span>

                                </div>

                                <div className='login-orther'>
                                    <span className='text-orther-login '>
                                        <span>Or</span>
                                    </span>

                                </div>
                                <div className='forgotPassword__footer'>

                                    <div className='forgotPassword__footer-login'>
                                        <span>Back to&nbsp;</span>
                                        <a onClick={() => this.handleShowModalForgotPassword()}>Login</a>
                                    </div>
                                </div>

                            </div>
                        }
                    </Modal>
                </div >

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        processLogout: () => dispatch(actions.processLogout()),
        adminProcessLogout: () => dispatch(actions.adminProcessLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
