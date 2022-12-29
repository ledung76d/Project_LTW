import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { push } from 'connected-react-router'
// import * as actions from '../../store/actions'
import './Register.scss'
import 'bootstrap'
import LogoShop from '../../assets/images/PickBazar.png'
// import adminService from '../../services/adminService'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      email: '',
      modal: false,
      isShowUserOption: false,
      isShowPassword: false,
      err: 4,
      message: '',
    }
  }
  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
      message: '',
    })
  }
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      message: '',
    })
  }

  handleRegister = async () => {
    // let userName = this.state.name
    // let passWord = this.state.password
    // let data = await adminService.login(userName, passWord)
    // console.log(data)
    // if (data.err !== 4) {
    //   this.setState({
    //     err: data.err,
    //     message: data.message,
    //   })
    // } else {
    //   //Thanh cong
    //   this.props.processLogout()
    //   this.props.adminLoginSuccess(data.admin)
    // }
  }

  // componentDidMount() {
  //   this.props.changeAppMode('adminMode')
  // }

  render() {
    //JSX

    return (
      <>
        <div className='login-admin'>
          <div className='login-container'>
            <div className='login-content'>
              <div className='col-12  text-login'>
                <img src={LogoShop} className='login-logo' />
              </div>
              <div className='col-12 text-contentlogin'></div>
              <div className='col-12 form-group login-input'>
                <label>
                  <span>Name</span>
                </label>
                <input
                  type='text'
                  className='form-control login-input--text'
                  placeholder='Enter you name'
                  value={this.state.name}
                  onChange={(event) => this.handleOnChangeName(event)}
                />
              </div>
              <div className='col-12 form-group login-input'>
                <label>
                  <span>Email</span>
                </label>
                <input
                  type='email'
                  className='form-control login-input--text'
                  placeholder='Enter you email'
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeName(event)}
                />
              </div>
              <div className='col-12 form-group login-input'>
                <label className='login-input-password'>
                  <span>Password</span>
                </label>
                <div className='custom-input-password'>
                  <input
                    type={this.state.isShowPassword ? 'text' : 'password'}
                    className='form-control login-input--text'
                    placeholder='Enter you password'
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                  />
                  <span
                    onClick={() =>
                      this.setState({
                        isShowPassword: !this.state.isShowPassword,
                      })
                    }
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? 'far fa-eye'
                          : 'far fa-eye-slash'
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <button
                className='btn-login btn-login-normal'
                onClick={() => this.handleRegister()}
              >
                Register
              </button>
              <div className='col-12'>
                <span style={{ color: 'red' }}>{this.state.message}</span>
              </div>
              <div className='col-12  login-orther'>
                <span className='text-orther-login '>
                  <span>Or</span>
                </span>
              </div>

              <div className='login-register-user '>
                <span>Already have an account? </span>
                <a>Login</a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//     isLoggedIn: state.admin.isLoggedIn,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     navigate: (path) => dispatch(push(path)),
//     adminLoginSuccess: (adminInfo) =>
//       dispatch(actions.adminLoginSuccess(adminInfo)),
//     adminLoginFail: () => dispatch(actions.adminLoginFail()),
//     processLogout: () => dispatch(actions.processLogout()),
//     changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Register)
export default Register