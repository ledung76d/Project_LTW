import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import "./Profile/Profile.scss";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

class NavUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
    };
  }

  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/");
  };
  componentDidMount() {
    let path = window.location.pathname;
    this.setState({
      active: path,
    });
  }

  render() {
    return (
      <>
        <div className="userLogin">
          <div className="user__wallet">
            <h3 className="user__wallet-title">Wallet</h3>
            <div className="user__wallet-list">
              <div className="user__wallet-list-item">
                <span>Total Points</span>
                <span>0</span>
              </div>
              <div className="user__wallet-list-item">
                <span>Points Used</span>
                <span>0</span>
              </div>
              <div className="user__wallet-list-item">
                <span>Available Points</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div className="user_sidebar">
            <ul className="user_sidebar-list">
              <li className="user_sidebar-list-item">
                <Link
                  to={"/profile"}
                  className={
                    this.state.active === "/profile"
                      ? "user_sidebar-list-item-link user_sidebar-list-item-link-profile"
                      : "user_sidebar-list-item-link "
                  }
                >
                  <span>Profile</span>
                </Link>
              </li>
              {/* <li className="user_sidebar-list-item ">
                <Link
                  to={"/change-password"}
                  className={
                    this.state.active === "/change-password"
                      ? "user_sidebar-list-item-link user_sidebar-list-item-link-profile"
                      : "user_sidebar-list-item-link "
                  }
                >
                  <span>Change Password</span>
                </Link>
              </li> */}
              <li className="user_sidebar-list-item">
                <Link
                  to={"/my-order"}
                  className={
                    this.state.active === "/my-order"
                      ? "user_sidebar-list-item-link user_sidebar-list-item-link-profile"
                      : "user_sidebar-list-item-link "
                  }
                >
                  <span>My Orders</span>
                </Link>
              </li>
              <li className="user_sidebar-list-item">
                <a className="user_sidebar-list-item-link">My Refunds</a>
              </li>
              <li className="user_sidebar-list-item">
                <Link to={"/faq"} className="user_sidebar-list-item-link">
                  <a className="user_sidebar-list-item-link">Need Help</a>
                </Link>
              </li>
            </ul>
            <div
              className="user_sidebar-logout"
              onClick={(e) => this.handleLogout(e)}
            >
              <a className="user_sidebar-logout-link">Logout</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    navigate: (path) => dispatch(push(path)),
    reduxChangeFLA: (payload) => dispatch(actions.changeFLA(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavUser);
