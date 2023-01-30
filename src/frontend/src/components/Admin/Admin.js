import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import AdminSideBar from "./AdminSidebar";
import Products from "./Products/ProductsContainer";
import "./Admin.scss";
import AdminOrder from "./Order/AdminOrder";
import Dashbroad from "./Dashbroad/Dashbroad";
import Analysis from "./Analysis/Analysis";
import EditShop from "./EditShop/EditShop";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 1,
    };
  }
  componentDidMount() {
    this.props.changeAppMode("adminMode");
  }

  changeMenu = (key) => {
    this.setState({
      menu: key,
    });
  };

  render() {
    let { menu } = this.state;
    return (
      <div className="admin-component-container">
        <div className=".container-fluid">
          <div className="row">
            <div className="col-sm-2 sidebar">
              <AdminSideBar
                changeMenu={this.changeMenu}
                menu={this.state.menu}
              />
            </div>
            <div className=" item-container">
              {menu === 1 ? (
                <Dashbroad changeMenu={this.changeMenu} />
              ) : menu === 2 ? (
                <Products />
              ) : menu === 3 ? (
                <AdminOrder />
              ) : menu === 4 ? (
                <Analysis />
              ) : (
                <EditShop />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
