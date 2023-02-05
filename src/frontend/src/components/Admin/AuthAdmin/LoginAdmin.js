import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import "./LoginAdmin.scss";
import "bootstrap";
import LogoShop from "../../../assets/images/PickBazar.png";
import adminService from "../../../services/adminService";

class LoginAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      phone: "",
      modal: false,
      err: 4,
      message: "",
    };
  }
  handleOnChangeStorename = (event) => {
    const storeName = event.target.value;
    const isValidStoreName = /^[a-zA-Z0-9\s]+$/.test(storeName);
    if (isValidStoreName && storeName.trim() !== '') {
      this.setState({
        storeName: storeName,
        message: "",
        err: 4,
      });
    } else {
      this.setState({
        message: "Store name can only contain letters, numbers and spaces.",
        err: 1,
      });
    }
  };
  
  handleOnChangeNumber = (event) => {
    const phoneNumber = event.target.value;
    const isValidNumber = /^[0-9]+$/.test(phoneNumber);
    if (isValidNumber && phoneNumber.trim() !== '') {
      this.setState({
        phone: phoneNumber,
        message: "",
        err: 4,
      });
    } else {
      this.setState({
        message: "Invalid phone number, please enter 10 digits",
      });
    }
  };

  handleRegister = async () => {
    let storeName = this.state.storeName;
    let phone = this.state.phone;
    // Validate
    if (storeName === "") {
      this.setState({
        message: "Please enter store name",
        err: 1,
      });
      return;
    }
    if (storeName.length < 6 || storeName.length > 30) {
      this.setState({
        message: "Store name must be between 6 and 30 characters",
        err: 1,
      });
      return;
    }
    if (phone === "") {
      this.setState({
        message: "Please enter phone number",
        err: 2,
      });
      return;
    }
    if (phone.length < 9 || phone.length > 13) {
      this.setState({
        message: "Phone number must be between 9 and 13 characters",
        err: 2,
      });
      return;
    }
    let data = await adminService.register(storeName, phone);
    if (data.err !== 4) {
      this.setState({
        err: data.err,
        message: data.message,
      });
    } else {
      this.props.processLogout();
      this.props.adminLoginSuccess(data.store);
      let { navigate } = this.props;
      navigate("/admin");
    }
  };

  componentDidMount() {
    this.props.changeAppMode("adminMode");
  }

  render() {
    return (
      <>
        <div className="login-admin">
          <div className="login-container">
            <div className="login-content">
              <div className="col-12  text-login">
                <img src={LogoShop} className="login-logo" />
              </div>
              <div className="col-12 text-contentlogin">Register as Shop</div>

              <div className="col-12 form-group login-input">
                <label>
                  <span>Store name</span>
                </label>
                <input
                  type="email"
                  className="form-control login-input--text"
                  placeholder="Enter your store name"
                  value={this.state.storeName}
                  onChange={(event) => this.handleOnChangeStorename(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label className="login-input-password">
                  <span>Phone</span>
                </label>
                <div className="custom-input-password">
                  <input
                    type={"text"}
                    className="form-control login-input--text"
                    placeholder="Enter your phone"
                    value={this.state.phone}
                    onChange={(event) => this.handleOnChangeNumber(event)}
                  />
                </div>
              </div>
              <button
                className="btn-login btn-login-normal"
                onClick={() => this.handleRegister()}
              >
                Register
              </button>
              <div className="col-12">
                <span style={{ color: "red" }}>{this.state.message}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.admin.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
    processLogout: () => dispatch(actions.processLogout()),
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);
